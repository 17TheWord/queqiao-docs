# API 处理实现

将 API 处理接口 `HandleApiService` 实现为 `HandleApiImpl` 类，并在其中编写具体的处理逻辑。

## Broadcast 实现示例

```java
public class HandleApiImpl implements HandleApiService { // 实现 API 处理接口
    /**
     * 广播消息
     *
     * @param jsonElement 消息体
     */
    @Override
    public void handleBroadcastMessage(JsonElement jsonElement) {
        // 使用工具类将 JSON 前缀元素解析为文本组件
        ITextComponent prefixed = ForgeTool.parseJsonToTextWrapped(GlobalContext.getMessagePrefixJsonObject());
        // 使用工具类将 JSON 聊天信息参数解析为文本组件
        ITextComponent message = ForgeTool.parseJsonToTextWrapped(jsonElement);

        // 如果消息和前缀均不为空，则向所有在线玩家发送消息
        if (message != null && prefixed != null) {
            for (EntityPlayerMP serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
                serverPlayer.sendMessage(prefixed.appendSibling(message));
            }
        }
    }

    // 其他方法省略...
}
```

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.handle;

import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.handle.HandleApiService;
import com.github.theword.queqiao.tool.response.PrivateMessageResponse;
import com.github.theword.queqiao.utils.ForgeTool;
import com.google.gson.JsonElement;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.network.Packet;
import net.minecraft.network.play.server.SPacketTitle;
import net.minecraft.util.text.ITextComponent;

import java.util.UUID;

import static com.github.theword.queqiao.QueQiao.minecraftServer;
import static com.github.theword.queqiao.utils.ForgeTool.getForgePlayer;


public class HandleApiImpl implements HandleApiService {
    /**
     * 广播消息
     *
     * @param jsonElement 消息体
     */
    @Override
    public void handleBroadcastMessage(JsonElement jsonElement) {
        ITextComponent prefixed = ForgeTool.parseJsonToTextWrapped(GlobalContext.getMessagePrefixJsonObject());
        ITextComponent message = ForgeTool.parseJsonToTextWrapped(jsonElement);
        if (message != null && prefixed != null) {
            for (EntityPlayerMP serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
                serverPlayer.sendMessage(prefixed.appendSibling(message));
            }
        }
    }


    /**
     * 广播 Send Title 消息
     *
     * @param titleJsonElement    Title 消息体
     * @param subtitleJsonElement Subtitle 消息体
     * @param fadein              Title 淡入时间
     * @param stay                Title 停留时间
     * @param fadeout             Title 淡出时间
     */
    @Override
    public void handleSendTitleMessage(JsonElement titleJsonElement, JsonElement subtitleJsonElement, int fadein, int stay, int fadeout) {

        if (titleJsonElement != null && !titleJsonElement.isJsonNull()) {
            ITextComponent title = ForgeTool.parseJsonToTextWrapped(titleJsonElement);
            sendPacket(new SPacketTitle(
                    SPacketTitle.Type.TITLE,
                    title,
                    fadein,
                    stay,
                    fadeout
            ));
        }

        if (subtitleJsonElement != null && !subtitleJsonElement.isJsonNull()) {
            ITextComponent subtitle = ForgeTool.parseJsonToTextWrapped(subtitleJsonElement);
            sendPacket(new SPacketTitle(
                    SPacketTitle.Type.SUBTITLE,
                    subtitle,
                    fadein,
                    stay,
                    fadeout
            ));
        }
    }

    /**
     * 广播 Action Bar 消息
     *
     * @param jsonElement Action Bar 消息体
     */
    @Override
    public void handleSendActionBarMessage(JsonElement jsonElement) {
        ITextComponent msg = ForgeTool.parseJsonToTextWrapped(jsonElement);
        if (msg != null) {
            sendPacket(new SPacketTitle(SPacketTitle.Type.ACTIONBAR, msg));
        }
    }

    /**
     * 私聊消息
     *
     * @param nickname    目标玩家名称
     * @param uuid        目标玩家 UUID
     * @param jsonElement 消息体
     */
    @Override
    public PrivateMessageResponse handleSendPrivateMessage(String nickname, UUID uuid, JsonElement jsonElement) {
        EntityPlayerMP targetPlayer;
        if (uuid != null)
            targetPlayer = minecraftServer.getPlayerList().getPlayerByUUID(uuid);
        else if (nickname != null && !nickname.isEmpty())
            targetPlayer = minecraftServer.getPlayerList().getPlayerByUsername(nickname);
        else {
            return PrivateMessageResponse.playerNotFound();
        }

        if (targetPlayer == null) {
            return PrivateMessageResponse.playerIsNull();
        }

        if (targetPlayer.hasDisconnected()) {
            return PrivateMessageResponse.playerNotOnline();
        }

        ITextComponent prefixed = ForgeTool.parseJsonToTextWrapped(GlobalContext.getMessagePrefixJsonObject());
        ITextComponent message = ForgeTool.parseJsonToTextWrapped(jsonElement);
        if (message != null && prefixed != null) {
            targetPlayer.sendMessage(prefixed.appendSibling(message));
        }
        return PrivateMessageResponse.sendSuccess(getForgePlayer(targetPlayer));
    }

    private void sendPacket(Packet<?> packet) {
        for (EntityPlayerMP serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
            serverPlayer.connection.sendPacket(packet);
        }
    }
}
```

:::
