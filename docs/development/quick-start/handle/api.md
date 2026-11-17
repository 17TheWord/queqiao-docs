# 平台上下文实现

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。旧版的 `HandleApiService` / `HandleApiImpl` 已被移除。
:::

`PlatformContext` 继承 `AbstractPlatformContext<S, C, P>`，是 core 与具体服务端之间的**唯一接入点**：

- `S`：服务端实例类型
- `C`：消息组件类型（如 Adventure `Component`、`ITextComponent`、Fabric `Text`）
- `P`：玩家类型

## 必须实现的原语

| 方法 | 说明 |
| --- | --- |
| `getServerType()` | 返回 `ServerTypeConstant` 中的规范值，如 `FORGE`、`PAPER` |
| `getServerVersion()` | 服务端版本 |
| `jsonToComponent(JsonElement)` | JSON 组件转平台组件 |
| `getPlayers()` | 在线玩家集合 |
| `getPlayerName(P)` / `getPlayerUUID(P)` | 玩家标识 |
| `getPlayerModel(P)` | 玩家模型快照 |
| `broadcast(C)` | 广播给所有玩家 |
| `sendPrivateMessage(P, C)` | 发送给指定玩家 |

## 可选能力

- `sendTitleComponent(title, subtitle, fadeIn, stay, fadeOut)`：默认返回 `UNSUPPORTED`。
- `sendActionBarComponent(C)`：默认返回 `UNSUPPORTED`。
- `parseTranslateModel(C)`：把平台翻译组件拆成 `TranslateModel`；默认返回 `null`。

## 返回值与前缀

- 所有发送方法返回 `PlatformResult<Void>`，只区分成功/失败。
- core **不再自动拼接消息前缀**，由平台实现自行处理（参考下方的 `withPrefix`）。

## 线程契约

Core 不保证调用线程：WebSocket 工作线程也可能直接进入这些方法。如果平台 API 要求主线程/Region 线程，需要平台侧自行调度。

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao;

import com.github.theword.queqiao.utils.ForgeTool;
import com.google.gson.JsonElement;
import io.github.theword.queqiao.core.constant.ServerTypeConstant;
import io.github.theword.queqiao.core.event.model.PlayerModel;
import io.github.theword.queqiao.core.event.model.TranslateModel;
import io.github.theword.queqiao.core.platform.AbstractPlatformContext;
import io.github.theword.queqiao.core.platform.PlatformResult;
import io.github.theword.queqiao.core.runtime.QueQiaoRuntime;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.network.Packet;
import net.minecraft.network.play.server.SPacketChat;
import net.minecraft.network.play.server.SPacketTitle;
import net.minecraft.server.MinecraftServer;
import net.minecraft.util.text.ChatType;
import net.minecraft.util.text.ITextComponent;
import net.minecraft.util.text.TextComponentTranslation;

import java.util.Collection;
import java.util.UUID;

public class PlatformContext extends AbstractPlatformContext<MinecraftServer, ITextComponent, EntityPlayerMP> {

    /**
     * 由 QueQiao 在 Runtime 创建后回填，用于读取消息前缀。
     */
    private volatile QueQiaoRuntime runtime;

    public PlatformContext(MinecraftServer server) {
        super(server);
    }

    public void bindRuntime(QueQiaoRuntime runtime) {
        this.runtime = runtime;
    }

    public QueQiaoRuntime getRuntime() {
        return runtime;
    }

    @Override
    public String getServerType() {
        return ServerTypeConstant.FORGE;
    }

    @Override
    public String getServerVersion() {
        return server.getMinecraftVersion();
    }

    @Override
    public ITextComponent jsonToComponent(JsonElement json) {
        return ForgeTool.buildComponent(json);
    }

    @Override
    public Collection<EntityPlayerMP> getPlayers() {
        return server.getPlayerList().getPlayers();
    }

    @Override
    public String getPlayerName(EntityPlayerMP player) {
        return player.getName();
    }

    @Override
    public UUID getPlayerUUID(EntityPlayerMP player) {
        return player.getUniqueID();
    }

    @Override
    public PlayerModel getPlayerModel(EntityPlayerMP player) {
        return ForgeTool.getForgePlayer(player);
    }

    @Override
    public PlatformResult<Void> broadcast(ITextComponent component) {
        sendPacket(new SPacketChat(withPrefix(component), ChatType.SYSTEM));
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendPrivateMessage(EntityPlayerMP player, ITextComponent component) {
        player.sendMessage(withPrefix(component));
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendTitleComponent(ITextComponent title, ITextComponent subtitle,
                                                   int fadeIn, int stay, int fadeOut) {
        if (title != null) {
            sendPacket(new SPacketTitle(SPacketTitle.Type.TITLE, title, fadeIn, stay, fadeOut));
        }
        if (subtitle != null) {
            sendPacket(new SPacketTitle(SPacketTitle.Type.SUBTITLE, subtitle, fadeIn, stay, fadeOut));
        }
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendActionBarComponent(ITextComponent component) {
        sendPacket(new SPacketTitle(SPacketTitle.Type.ACTIONBAR, component));
        return PlatformResult.success(null);
    }

    /**
     * 把 MC 的翻译组件拆成 TranslateModel，翻译文本由平台翻译服务提供。
     */
    @Override
    public TranslateModel parseTranslateModel(ITextComponent component) {
        if (!(component instanceof TextComponentTranslation)) {
            return new TranslateModel(null, null, component.getUnformattedText());
        }

        TextComponentTranslation translation = (TextComponentTranslation) component;
        return buildTranslateModel(
                translation.getKey(),
                translation.getFormatArgs(),
                arg -> arg instanceof ITextComponent
                        ? parseTranslateModel((ITextComponent) arg)
                        : new TranslateModel(null, null, String.valueOf(arg)),
                component.getUnformattedText()
        );
    }

    /**
     * 按配置拼接消息前缀。
     */
    private ITextComponent withPrefix(ITextComponent component) {
        QueQiaoRuntime current = runtime;
        JsonElement prefix = current == null ? null : current.getMessagePrefixJsonElement();
        if (prefix == null) {
            return component;
        }
        return ForgeTool.buildComponent(prefix).appendSibling(component);
    }

    private void sendPacket(Packet<?> packet) {
        for (EntityPlayerMP player : getPlayers()) {
            player.connection.sendPacket(packet);
        }
    }
}
```

:::
