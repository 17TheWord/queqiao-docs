# Spigot 事件

## Player

|         **字段名**         | **数据类型** |    **可能的值**    |        **说明**         |
|:-----------------------:|:--------:|:--------------:|:---------------------:|
|        nickname         |  string  |       -        |         玩家昵称          |
|          uuid           |  string  |       -        |        玩家 UUID        |
|      display_name       |  string  |       -        |         玩家显示名         |
|    is_health_scaled     |   bool   | `true`/`false` |       玩家是否有血量缩放       |
|         address         |  string  |       -        |         玩家 IP         |
|      is_sprinting       |   bool   | `true`/`false` |        玩家是否在跑         |
|       walk_speed        |  float   |       -        |        玩家行走速度         |
|        fly_speed        |  float   |       -        |        玩家飞行速度         |
|       is_sneaking       |   bool   | `true`/`false` |        玩家是否潜行         |
|          level          |   int    |       -        |         玩家等级？         |
|        is_flying        |   bool   | `true`/`false` |        玩家是否飞行         |
|          ping           |   int    |       -        | 玩家延迟（1.12.2 中无该项，为-1） |
|      allow_flight       |   bool   | `true`/`false` |       玩家是否允许飞行        |
|         locale          |  string  |       -        |         玩家语言          |
|      health_scale       |  float   |       -        |        玩家血量缩放         |
|   player_time_offset    |   int    |       -        |        玩家时间偏移         |
|           exp           |  float   |       -        |         玩家经验          |
|        total_exp        |   int    |       -        |         玩家总经验         |
|       player_time       |   int    |       -        |         玩家时间          |
| is_player_time_relative |   bool   | `true`/`false` |       玩家时间是否相对        |
|          is_op          |   bool   | `true`/`false` |       玩家是否为 OP        |

## 玩家聊天事件

|    **字段名**     |     **数据类型**      |        **可能的值**        |   **说明**   |
|:--------------:|:-----------------:|:----------------------:|:----------:|
|  server_name   |      string       |           -            | 收到事件的服务器名称 |
| server_version |      string       |           -            |   游戏版本号    |
|  server_type   |      string       |           -            |   服务端类型    |
|   post_type    |      string       |       `message`        |    上报类型    |
|    sub_type    |      string       |         `chat`         |    子类型     |
|   event_name   |      string       | `AsyncPlayerChatEvent` |    事件名称    |
|     player     | [Player](#player) |                        |  发送消息的玩家   |
|    message     |      Message      |                        |   发送的消息    |

## 玩家命令事件

|    **字段名**     |     **数据类型**      |            **可能的值**            |   **说明**   |
|:--------------:|:-----------------:|:------------------------------:|:----------:|
|  server_name   |      string       |               -                | 收到事件的服务器名称 |
| server_version |      string       |               -                |   游戏版本号    |
|  server_type   |      string       |               -                |   服务端类型    |
|   post_type    |      string       |           `message`            |    上报类型    |
|    sub_type    |      string       |        `player_command`        |    子类型     |
|   event_name   |      string       | `PlayerCommandPreprocessEvent` |    事件名称    |
|     player     | [Player](#player) |               -                |  发送命令的玩家   |
|    message     |      string      |               -                |   发送的命令    |

## 玩家加入事件

|    **字段名**     |     **数据类型**      |     **可能的值**      |   **说明**   |
|:--------------:|:-----------------:|:-----------------:|:----------:|
|  server_name   |      string       |         -         | 收到事件的服务器名称 |
| server_version |      string       |         -         |   游戏版本号    |
|  server_type   |      string       |         -         |   服务端类型    |
|   post_type    |      string       |     `notice`      |    上报类型    |
|    sub_type    |      string       |      `join`       |    子类型     |
|   event_name   |      string       | `PlayerJoinEvent` |    事件名称    |
|     player     | [Player](#player) |         -         |   加入的玩家    |

## 玩家离开事件

|    **字段名**     |     **数据类型**      |     **可能的值**      |   **说明**   |
|:--------------:|:-----------------:|:-----------------:|:----------:|
|  server_name   |      string       |         -         | 收到事件的服务器名称 |
| server_version |      string       |         -         |   游戏版本号    |
|  server_type   |      string       |         -         |   服务端类型    |
|   post_type    |      string       |     `notice`      |    上报类型    |
|    sub_type    |      string       |      `quit`       |    子类型     |
|   event_name   |      string       | `PlayerQuitEvent` |    事件名称    |
|     player     | [Player](#player) |                   |   离开的玩家    |

## 玩家死亡事件

|    **字段名**     |     **数据类型**      |      **可能的值**      |   **说明**   |
|:--------------:|:-----------------:|:------------------:|:----------:|
|  server_name   |      string       |         -          | 收到事件的服务器名称 |
| server_version |      string       |         -          |   游戏版本号    |
|  server_type   |      string       |         -          |   服务端类型    |
|   post_type    |      string       |      `notice`      |    上报类型    |
|    sub_type    |      string       |      `death`       |    子类型     |
|   event_name   |      string       | `PlayerDeathEvent` |    事件名称    |
|     player     | [Player](#player) |         -          |   死亡的玩家    |
