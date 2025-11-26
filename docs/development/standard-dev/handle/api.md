# API 处理实现

本章节介绍如何实现API处理器。

## 继承 HandleApiService 接口

- 首先，我们需要创建一个新的类，继承自 `HandleApiService` 接口。
- 这个接口定义了处理 API 消息所需的方法。

```java
public class HandleApiImpl implements HandleApiService {
    // 实现接口方法
}
```

## 实现 Broadcast 接口

- 接下来，我们需要实现 `Broadcast` 方法，以处理消息广播。
- 该方法接收一个 `JsonElement` 类型的参数，表示来自外部系统的消息数据。
- 查找服务端的 `Javadoc` 或现有实现以了解如何解析和处理这些数据。

```java
@Nullable
public static MutableComponent fromJson(@Nullable JsonElement p_330936_, HolderLookup.Provider p_331821_) {
    return p_330936_ == null ? null : deserialize(p_330936_, p_331821_);
}
```

- 在 `1.21` 中，可以通过以下方法将 JsonElement 转为消息组件。

```java
public void handleBroadcastMessage(JsonElement jsonElement) {
    MutableComponent mutableComponent = Component.Serializer.fromJson(
        // 鹊桥的聊天消息前缀
        GlobalContext.getMessagePrefixJsonObject(),
        // 通过服务端实例获取注册表访问
        minecraftServer.registryAccess()
    );

    // fromJson 可能返回 null，需要断言
    assert mutableComponent != null;

    // 解析传入的 JsonElement 并追加到消息组件中
    MutableComponent message = Component.Serializer.fromJson(
        jsonElement,
        minecraftServer.registryAccess()
    );

    // 如果消息不为 null，则追加到前缀后面
    if (message != null) {
        mutableComponent.append(message);
    }

    sendPacket(new ClientboundSystemChatPacket(mutableComponent, false));
}
```

- 至此，我们已经成功实现 Broadcast 方法，可以广播消息到游戏内。
- 但我们还没有编写具体的发送逻辑。

## 通用的发送数据包逻辑

- 为了减少重复代码，我们可以创建一个通用的方法来发送数据包。
- 该方法遍历所有在线玩家，并通过他们的连接发送数据包。

```java
private void sendPacket(Packet<?> packet) {
    for (ServerPlayer serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
        serverPlayer.connection.send(packet);
    }
}
```

## 其他接口

- 其他接口在实现上大同小异，此处不再赘述。直接提供参考代码。
- 同时别忘了注意多版本兼容性的问题。

::: details 示例代码

```java
package com.github.theword.queqiao.handle;

import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.handle.HandleApiService;
import com.github.theword.queqiao.tool.response.PrivateMessageResponse;
import com.google.gson.JsonElement;

import java.util.UUID;

// IF > forge-1.16.5
import net.minecraft.network.chat.Component;
import net.minecraft.network.chat.MutableComponent;
import net.minecraft.network.protocol.Packet;
import net.minecraft.network.protocol.game.*;
import net.minecraft.server.level.ServerPlayer;
// ELSE
//import net.minecraft.entity.player.ServerPlayerEntity;
//import net.minecraft.network.IPacket;
//import net.minecraft.network.play.server.SChatPacket;
//import net.minecraft.network.play.server.STitlePacket;
//import net.minecraft.util.text.ChatType;
//import net.minecraft.util.text.ITextComponent;
// END IF

// IF forge-1.18.2
//import net.minecraft.network.chat.ChatType;
// END IF

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
        // IF >= forge-1.21
        MutableComponent mutableComponent = Component.Serializer.fromJson(GlobalContext.getMessagePrefixJsonObject(), minecraftServer.registryAccess());
        assert mutableComponent != null;
        MutableComponent message = Component.Serializer.fromJson(jsonElement, minecraftServer.registryAccess());
        if (message != null) {
            mutableComponent.append(message);
        }
        sendPacket(new ClientboundSystemChatPacket(mutableComponent, false));
        // ELSE IF >= forge-1.18
//        MutableComponent mutableComponent = Component.Serializer.fromJson(GlobalContext.getMessagePrefixJsonObject());
//        assert mutableComponent != null;
//        MutableComponent message = Component.Serializer.fromJson(jsonElement);
//        if (message != null) {
//            mutableComponent.append(message);
//        }
        // IF >= forge-1.19
//        sendPacket(new ClientboundSystemChatPacket(mutableComponent, false));
        // ELSE
//        sendPacket(new ClientboundChatPacket(mutableComponent, ChatType.CHAT, UUID.randomUUID()));
        // END IF
        // ELSE
//        net.minecraft.util.text.IFormattableTextComponent mutableComponent = ITextComponent.Serializer.fromJson(GlobalContext.getMessagePrefixJsonObject());
//        assert mutableComponent != null;
//        net.minecraft.util.text.IFormattableTextComponent messageComponent = ITextComponent.Serializer.fromJson(jsonElement);
//        if (messageComponent != null) {
//            mutableComponent.append(messageComponent);
//        }
//        sendPacket(new SChatPacket(mutableComponent, ChatType.CHAT, UUID.randomUUID()));
        // END IF
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
        // IF >= forge-1.21
        sendPacket(new ClientboundSetTitlesAnimationPacket(fadein, stay, fadeout));
        if (titleJsonElement != null && !titleJsonElement.isJsonNull()) {
            MutableComponent title = Component.Serializer.fromJson(titleJsonElement, minecraftServer.registryAccess());
            if (title != null)
                sendPacket(new ClientboundSetSubtitleTextPacket(title));
        }
        if (subtitleJsonElement != null && !subtitleJsonElement.isJsonNull()) {
            MutableComponent subtitle = Component.Serializer.fromJson(subtitleJsonElement, minecraftServer.registryAccess());
            if (subtitle != null)
                sendPacket(new ClientboundSetSubtitleTextPacket(subtitle));
        }
        // ELSE IF >= forge-1.18
//        sendPacket(new ClientboundSetTitlesAnimationPacket(fadein, stay, fadeout));
//        if (titleJsonElement != null && !titleJsonElement.isJsonNull()) {
//            MutableComponent title = Component.Serializer.fromJson(titleJsonElement);
//            if (title != null)
//                sendPacket(new ClientboundSetSubtitleTextPacket(title));
//        }
//
//        if (subtitleJsonElement != null && !subtitleJsonElement.isJsonNull()) {
//            MutableComponent subtitle = Component.Serializer.fromJson(subtitleJsonElement);
//            if (subtitle != null)
//                sendPacket(new ClientboundSetSubtitleTextPacket(subtitle));
//        }
        // ELSE
//        sendPacket(new STitlePacket(fadein, stay, fadeout));
//        if (titleJsonElement != null && !titleJsonElement.isJsonNull()) {
//            net.minecraft.util.text.IFormattableTextComponent title = ITextComponent.Serializer.fromJson(titleJsonElement);
//            if (title != null)
//                sendPacket(new STitlePacket(STitlePacket.Type.TITLE, title));
//        }
//
//        if (subtitleJsonElement != null && !subtitleJsonElement.isJsonNull()) {
//            net.minecraft.util.text.IFormattableTextComponent subtitle = ITextComponent.Serializer.fromJson(subtitleJsonElement);
//            if (subtitle != null)
//                sendPacket(new STitlePacket(STitlePacket.Type.SUBTITLE, subtitle));
//        }
        // END IF
    }

    @Override
    public void handleSendActionBarMessage(JsonElement jsonElement) {
        // IF >= forge-1.21
        MutableComponent actionBar = Component.Serializer.fromJson(jsonElement, minecraftServer.registryAccess());
        if (actionBar != null) {
            sendPacket(new ClientboundSetActionBarTextPacket(actionBar));
        }
        // ELSE IF >= forge-1.18
//        MutableComponent actionBar = Component.Serializer.fromJson(jsonElement);
//        if (actionBar != null) {
//            sendPacket(new ClientboundSetActionBarTextPacket(actionBar));
//        }
        // ELSE
//        ITextComponent actionBar = ITextComponent.Serializer.fromJson(jsonElement);
//        if (actionBar != null) {
//            sendPacket(new SChatPacket(actionBar, ChatType.GAME_INFO, UUID.randomUUID()));
//        }
        // END IF
    }

    @Override
    public PrivateMessageResponse handleSendPrivateMessage(String nickname, UUID uuid, JsonElement jsonElement) {
        // IF > forge-1.16.5
        ServerPlayer targetPlayer;
        // ELSE
//        ServerPlayerEntity targetPlayer;
        // END IF
        if (uuid != null)
            targetPlayer = minecraftServer.getPlayerList().getPlayer(uuid);
        else if (nickname != null && !nickname.isEmpty())
            targetPlayer = minecraftServer.getPlayerList().getPlayerByName(nickname);
        else {
            return PrivateMessageResponse.playerNotFound();
        }

        if (targetPlayer == null) {
            return PrivateMessageResponse.playerIsNull();
        }

        if (targetPlayer.hasDisconnected()) {
            return PrivateMessageResponse.playerNotOnline();
        }
        // IF >= forge-1.21
        MutableComponent mutableComponent = Component.Serializer.fromJson(jsonElement, minecraftServer.registryAccess());
        // ELSE IF >= forge-1.18
//        MutableComponent mutableComponent = Component.Serializer.fromJson(jsonElement);
        // ELSE
//        ITextComponent mutableComponent = ITextComponent.Serializer.fromJson(jsonElement);
        // END IF

        if (mutableComponent == null) {
            return PrivateMessageResponse.of(getForgePlayer(targetPlayer), "消息内容错误");
        }

        // IF >= forge-1.19
        targetPlayer.sendSystemMessage(mutableComponent);
        // ELSE
//        targetPlayer.sendMessage(mutableComponent, UUID.randomUUID());
        // END IF

        return PrivateMessageResponse.sendSuccess(getForgePlayer(targetPlayer));
    }

    // IF > forge-1.16.5
    private void sendPacket(Packet<?> packet) {
        for (ServerPlayer serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
            serverPlayer.connection.send(packet);
        }
    }
    // ELSE
//    private void sendPacket(IPacket<?> packet) {
//        for (ServerPlayerEntity serverPlayer : minecraftServer.getPlayerList().getPlayers()) {
//            serverPlayer.connection.send(packet);
//        }
//    }
    // END IF
}
```

:::
