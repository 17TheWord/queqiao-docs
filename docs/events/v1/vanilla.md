# 原版事件

## Player

- 原版端玩家昵称来自原日志
- 仅封装玩家昵称，其他字段无法获取

| **字段名**  | **数据类型** | **可能的值** | **说明** |
|:--------:|:--------:|:--------:|:------:|
| nickname |  string  |    -     |  玩家昵称  |

## 玩家聊天事件

|    **字段名**     |     **数据类型**      |          **可能的值**          |   **说明**   |
|:--------------:|:-----------------:|:--------------------------:|:----------:|
|  server_name   |      string       |             -              | 收到事件的服务器名称 |
| server_version |      string       |             -              |   游戏版本号    |
|  server_type   |      string       |             -              |   服务端类型    |
|   post_type    |      string       |         `message`          |    上报类型    |
|    sub_type    |      string       |           `chat`           |    子类型     |
|   event_name   |      string       | `MinecraftPlayerChatEvent` |    事件名称    |
|     player     | [Player](#player) |             -              |  发送消息的玩家   |
|    message     |      string       |             -              |   发送的消息    |

## 玩家加入服务器事件

|    **字段名**     |     **数据类型**      |          **可能的值**          |   **说明**   |
|:--------------:|:-----------------:|:--------------------------:|:----------:|
|  server_name   |      string       |             -              | 收到事件的服务器名称 |
| server_version |      string       |             -              |   游戏版本号    |
|  server_type   |      string       |             -              |   服务端类型    |
|   post_type    |      string       |          `notice`          |    上报类型    |
|    sub_type    |      string       |           `join`           |    子类型     |
|   event_name   |      string       | `MinecraftPlayerJoinEvent` |    事件名称    |
|     player     | [Player](#player) |             -              |  加入服务器的玩家  |

## 玩家离开服务器事件

|    **字段名**     |     **数据类型**      |          **可能的值**          |   **说明**   |
|:--------------:|:-----------------:|:--------------------------:|:----------:|
|  server_name   |      string       |             -              | 收到事件的服务器名称 |
| server_version |      string       |             -              |   游戏版本号    |
|  server_type   |      string       |             -              |   服务端类型    |
|   post_type    |      string       |          `notice`          |    上报类型    |
|    sub_type    |      string       |           `quit`           |    子类型     |
|   event_name   |      string       | `MinecraftPlayerQuitEvent` |    事件名称    |
|     player     | [Player](#player) |             -              |  离开服务器的玩家  |
