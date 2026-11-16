# 平台上下文实现

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。旧版的 `HandleApiService` / `HandleApiImpl` 已被移除。
:::

`PlatformContext` 继承 `AbstractPlatformContext<S, C, P>`，负责把 core 的发送请求翻译成平台数据包。

## 多版本类型差异

Forge 各版本的组件与玩家类型不同：

- `1.16.5`：`ITextComponent` / `ServerPlayerEntity`
- `1.18.2+`：`Component` / `ServerPlayer`

如果为每个方法都写 `IF` 分支，代码会非常冗长。本项目采用的做法是：

- 泛型参数使用 `Object`（`AbstractPlatformContext<MinecraftServer, Object, Object>`）。
- 在方法内部按版本分支转型。
- 发包、组件序列化等差异仍保留 `IF` 注释。

## 关键点

- `getServerType()` 返回 `ServerTypeConstant.FORGE`。
- `jsonToComponent` 交给 `ForgeTool` 完成。
- 广播/私聊/标题/ActionBar 都通过统一的 `sendPacket` 发给所有玩家。
- core 不再拼接消息前缀，由 `withPrefix` 自行处理。
- `parseTranslateModel` 使用 `buildTranslateModel(key, args, 参数解析器, 回退文本)`。

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
import net.minecraft.server.MinecraftServer;

// IF > forge-1.16.5
//import net.minecraft.network.chat.Component;
//import net.minecraft.network.chat.MutableComponent;
//import net.minecraft.network.protocol.Packet;
//import net.minecraft.network.protocol.game.*;
//import net.minecraft.server.level.ServerPlayer;
// ELSE
//import net.minecraft.entity.player.ServerPlayerEntity;
//import net.minecraft.network.IPacket;
//import net.minecraft.network.play.server.SChatPacket;
//import net.minecraft.network.play.server.STitlePacket;
//import net.minecraft.util.text.ChatType;
//import net.minecraft.util.text.IFormattableTextComponent;
//import net.minecraft.util.text.ITextComponent;
// END IF

// IF forge-1.18.2
//import net.minecraft.network.chat.ChatType;
// END IF

// IF forge-1.16.5
//import net.minecraft.util.text.TranslationTextComponent;
// ELSE IF forge-1.18.2
//import net.minecraft.network.chat.TranslatableComponent;
// ELSE
//import net.minecraft.network.chat.contents.TranslatableContents;
// END IF

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class PlatformContext extends AbstractPlatformContext<MinecraftServer, Object, Object> {

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
        return server.getServerVersion();
    }

    @Override
    public Object jsonToComponent(JsonElement json) {
        return ForgeTool.buildComponent(json);
    }

    @Override
    public Collection<Object> getPlayers() {
        return new ArrayList<Object>(server.getPlayerList().getPlayers());
    }

    @Override
    public String getPlayerName(Object player) {
        // IF > forge-1.16.5
//        return ((ServerPlayer) player).getName().getString();
        // ELSE
//        return ((ServerPlayerEntity) player).getName().getString();
        // END IF
    }

    @Override
    public UUID getPlayerUUID(Object player) {
        // IF > forge-1.16.5
//        return ((ServerPlayer) player).getUUID();
        // ELSE
//        return ((ServerPlayerEntity) player).getUUID();
        // END IF
    }

    @Override
    public PlayerModel getPlayerModel(Object player) {
        // IF > forge-1.16.5
//        return ForgeTool.getForgePlayer((ServerPlayer) player);
        // ELSE
//        return ForgeTool.getForgePlayer((ServerPlayerEntity) player);
        // END IF
    }

    @Override
    public PlatformResult<Void> broadcast(Object component) {
        Object message = withPrefix(component);
        // IF >= forge-1.19
//        sendPacket(new ClientboundSystemChatPacket((Component) message, false));
        // ELSE IF >= forge-1.18
//        sendPacket(new ClientboundChatPacket((Component) message, ChatType.CHAT, UUID.randomUUID()));
        // ELSE
//        sendPacket(new SChatPacket((ITextComponent) message, ChatType.CHAT, UUID.randomUUID()));
        // END IF
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendPrivateMessage(Object player, Object component) {
        // IF >= forge-1.19
//        ((ServerPlayer) player).sendSystemMessage((Component) withPrefix(component));
        // ELSE IF >= forge-1.18
//        ((ServerPlayer) player).sendMessage((Component) withPrefix(component), UUID.randomUUID());
        // ELSE
//        ((ServerPlayerEntity) player).sendMessage((ITextComponent) withPrefix(component), UUID.randomUUID());
        // END IF
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendTitleComponent(Object title, Object subtitle, int fadeIn, int stay, int fadeOut) {
        // IF >= forge-1.18
//        sendPacket(new ClientboundSetTitlesAnimationPacket(fadeIn, stay, fadeOut));
//        if (title != null) {
//            sendPacket(new ClientboundSetTitleTextPacket((Component) title));
//        }
//        if (subtitle != null) {
//            sendPacket(new ClientboundSetSubtitleTextPacket((Component) subtitle));
//        }
        // ELSE
//        sendPacket(new STitlePacket(fadeIn, stay, fadeOut));
//        if (title != null) {
//            sendPacket(new STitlePacket(STitlePacket.Type.TITLE, (ITextComponent) title));
//        }
//        if (subtitle != null) {
//            sendPacket(new STitlePacket(STitlePacket.Type.SUBTITLE, (ITextComponent) subtitle));
//        }
        // END IF
        return PlatformResult.success(null);
    }

    @Override
    public PlatformResult<Void> sendActionBarComponent(Object component) {
        // IF >= forge-1.18
//        sendPacket(new ClientboundSetActionBarTextPacket((Component) component));
        // ELSE
//        sendPacket(new SChatPacket((ITextComponent) component, ChatType.GAME_INFO, UUID.randomUUID()));
        // END IF
        return PlatformResult.success(null);
    }

    /**
     * 把 MC 的翻译组件拆成 TranslateModel，翻译文本由平台翻译服务提供。
     */
    @Override
    public TranslateModel parseTranslateModel(Object component) {
        // IF forge-1.16.5
//        if (!(component instanceof TranslationTextComponent)) {
//            return new TranslateModel(null, null, componentText(component));
//        }
//        TranslationTextComponent translatableTextContent = (TranslationTextComponent) component;
        // ELSE IF forge-1.18.2
//        Component textComponent = (Component) component;
//        if (!(textComponent instanceof TranslatableComponent)) {
//            return new TranslateModel(null, null, componentText(textComponent));
//        }
//        TranslatableComponent translatableTextContent = (TranslatableComponent) textComponent;
        // ELSE
//        Component textComponent = (Component) component;
//        if (!(textComponent.getContents() instanceof TranslatableContents translatableTextContent)) {
//            return new TranslateModel(null, null, componentText(textComponent));
//        }
        // END IF

        return buildTranslateModel(
                translatableTextContent.getKey(),
                translatableTextContent.getArgs(),
                this::parseTranslateArgument,
                componentText(component)
        );
    }

    // IF forge-1.16.5
//    private TranslateModel parseTranslateArgument(Object arg) {
//        return arg instanceof ITextComponent
//                ? parseTranslateModel(arg)
//                : new TranslateModel(null, null, String.valueOf(arg));
//    }
//
//    private String componentText(Object component) {
//        return ((ITextComponent) component).getString();
//    }
    // ELSE
//    private TranslateModel parseTranslateArgument(Object arg) {
//        return arg instanceof Component
//                ? parseTranslateModel(arg)
//                : new TranslateModel(null, null, String.valueOf(arg));
//    }
//
//    private String componentText(Object component) {
//        return ((Component) component).getString();
//    }
    // END IF

    /**
     * 按配置拼接消息前缀（core 不再代平台拼接）。
     */
    // IF > forge-1.16.5
//    private Object withPrefix(Object component) {
//        QueQiaoRuntime current = runtime;
//        JsonElement prefix = current == null ? null : current.getMessagePrefixJsonElement();
//        if (prefix == null) {
//            return component;
//        }
//        MutableComponent result = ForgeTool.buildComponent(prefix);
//        return result == null ? component : result.append((Component) component);
//    }
    // ELSE
//    private Object withPrefix(Object component) {
//        QueQiaoRuntime current = runtime;
//        JsonElement prefix = current == null ? null : current.getMessagePrefixJsonElement();
//        if (prefix == null) {
//            return component;
//        }
//        IFormattableTextComponent result = ForgeTool.buildComponent(prefix);
//        return result == null ? component : result.append((ITextComponent) component);
//    }
    // END IF

    // IF > forge-1.16.5
//    private void sendPacket(Packet<?> packet) {
//        for (ServerPlayer player : server.getPlayerList().getPlayers()) {
//            player.connection.send(packet);
//        }
//    }
    // ELSE
//    private void sendPacket(IPacket<?> packet) {
//        for (ServerPlayerEntity player : server.getPlayerList().getPlayers()) {
//            player.connection.send(packet);
//        }
//    }
    // END IF
}
```

:::
