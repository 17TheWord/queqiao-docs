# 基础事件

各个服务端均集成自当前文档所述的基础事件，但根据各服务端不同，会在此基础上拓展更多字段，详情请参考各服务端对应的事件文档。

---

## BasePlayer

| **字段名**  |  **数据类型**   |    **可能的值**    |     **说明**     |
|:--------:|:-----------:|:--------------:|:--------------:|
| nickname |   string    |                |      玩家昵称      |
|   uuid   | string/UUID |                | 玩家 UUID，原版端不适用 |
|  is_op   |   boolean   | `true`/`false` | 是否为 OP，原版端不适用  |

## BaseEvent

|    **字段名**     | **数据类型** |                   **可能的值**                    |   **说明**   |
|:--------------:|:--------:|:---------------------------------------------:|:----------:|
|  server_name   |  string  |                   `Server`                    | 收到事件的服务器名称 |
| server_version |  string  |            `1.20.1`/`1.16.5`/`...`            |   游戏版本号    |
|  server_type   |  string  |        `spigot`/`forge`/`origin`/`...`        |   服务端类型    |
|   post_type    |  string  |              `message`/`notice`               |    上报类型    |
|    sub_type    |  string  | `chat`/`player_command`/`death`/`join`/`quit` |    子类型     |
|   event_name   |  string  |                       -                       |    事件名称    |

## MessageEvent

|    **字段名**     |       **数据类型**        | **可能的值**  |   **说明**   |
|:--------------:|:---------------------:|:---------:|:----------:|
|  server_name   |        string         |     -     | 收到事件的服务器名称 |
| server_version |        string         |     -     |   游戏版本号    |
|  server_type   |        string         |     -     |   服务端类型    |
|   post_type    |        string         | `message` |    上报类型    |
|    sub_type    |        string         |     -     |    子类型     |
|   event_name   |        string         |     -     |    事件名称    |
|     player     | [Player](#baseplayer) |     -     |  发送消息的玩家   |
|    message     |        string         |     -     |   发送的消息    |

## BaseChatEvent

|    **字段名**     |       **数据类型**        | **可能的值**  |   **说明**   |
|:--------------:|:---------------------:|:---------:|:----------:|
|  server_name   |        string         |     -     | 收到事件的服务器名称 |
| server_version |        string         |     -     |   游戏版本号    |
|  server_type   |        string         |     -     |   服务端类型    |
|   post_type    |        string         | `message` |    上报类型    |
|    sub_type    |        string         |  `chat`   |    子类型     |
|   event_name   |        string         |     -     |    事件名称    |
|     player     | [Player](#baseplayer) |     -     |  发送消息的玩家   |
|    message     |        string         |     -     |   发送的消息    |

## BasePlayerCommandEvent

|    **字段名**     |       **数据类型**        |     **可能的值**     |   **说明**   |
|:--------------:|:---------------------:|:----------------:|:----------:|
|  server_name   |        string         |        -         | 收到事件的服务器名称 |
| server_version |        string         |        -         |   游戏版本号    |
|  server_type   |        string         |        -         |   服务端类型    |
|   post_type    |        string         |    `message`     |    上报类型    |
|    sub_type    |        string         | `player_command` |    子类型     |
|   event_name   |        string         |        -         |    事件名称    |
|     player     | [Player](#baseplayer) |        -         |  发送命令的玩家   |
|    message     |        string         |        -         |   发送的命令    |

## BaseDeathEvent

- `原版端`、`Velocity` 无该事件

|    **字段名**     |       **数据类型**        | **可能的值**  |   **说明**   |
|:--------------:|:---------------------:|:---------:|:----------:|
|  server_name   |        string         |     -     | 收到事件的服务器名称 |
| server_version |        string         |     -     |   游戏版本号    |
|  server_type   |        string         |     -     |   服务端类型    |
|   post_type    |        string         | `message` |    上报类型    |
|    sub_type    |        string         |  `death`  |    子类型     |
|   event_name   |        string         |     -     |    事件名称    |
|     player     | [Player](#baseplayer) |     -     |   死亡的玩家    |
|    message     |        string         |     -     |  死亡播报的消息   |

## NoticeEvent

|    **字段名**     |       **数据类型**        | **可能的值** |   **说明**   |
|:--------------:|:---------------------:|:--------:|:----------:|
|  server_name   |        string         |    -     | 收到事件的服务器名称 |
| server_version |        string         |    -     |   游戏版本号    |
|  server_type   |        string         |    -     |   服务端类型    |
|   post_type    |        string         | `notice` |    上报类型    |
|    sub_type    |        string         |    -     |    子类型     |
|   event_name   |        string         |    -     |    事件名称    |
|     player     | [Player](#baseplayer) |    -     |  发送消息的玩家   |

## BaseJoinEvent

|    **字段名**     |       **数据类型**        | **可能的值** |   **说明**   |
|:--------------:|:---------------------:|:--------:|:----------:|
|  server_name   |        string         |    -     | 收到事件的服务器名称 |
| server_version |        string         |    -     |   游戏版本号    |
|  server_type   |        string         |    -     |   服务端类型    |
|   post_type    |        string         | `notice` |    上报类型    |
|    sub_type    |        string         |  `join`  |    子类型     |
|   event_name   |        string         |    -     |    事件名称    |
|     player     | [Player](#baseplayer) |    -     |  加入服务器的玩家  |

## BaseQuitEvent

|    **字段名**     |       **数据类型**        | **可能的值** |   **说明**   |
|:--------------:|:---------------------:|:--------:|:----------:|
|  server_name   |        string         |    -     | 收到事件的服务器名称 |
| server_version |        string         |    -     |   游戏版本号    |
|  server_type   |        string         |    -     |   服务端类型    |
|   post_type    |        string         | `notice` |    上报类型    |
|    sub_type    |        string         |  `quit`  |    子类型     |
|   event_name   |        string         |    -     |    事件名称    |
|     player     | [Player](#baseplayer) |    -     |  离开服务器的玩家  |
