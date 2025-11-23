# Fabric 事件

## Player

|    **字段名**     | **数据类型** |    **可能的值**    | **说明**  |
|:--------------:|:--------:|:--------------:|:-------:|
|    nickname    |  string  |       -        |  玩家昵称   |
|      uuid      |  string  |       -        | 玩家 UUID |
|       ip       |  string  |       -        |  玩家 IP  |
|  display_name  |  string  |       -        |  玩家 display_name |
| movement_speed |  float   |       -        |  移动速度   |
|    block_x     |   int    |       -        |  X 坐标   |
|    block_y     |   int    |       -        |  Y 坐标   |
|    block_z     |   int    |       -        |  Z 坐标   |
|  is_creative   |   bool   | `true`/`false` |  是否创造   |
|  is_spectator  |   bool   | `true`/`false` |  是否旁观   |
|  is_sneaking   |   bool   | `true`/`false` | 是否正在潜行  |
|  is_sleeping   |   bool   | `true`/`false` | 是否正在睡觉  |
|  is_climbing   |   bool   | `true`/`false` | 是否正在攀爬  |
|  is_swimming   |   bool   | `true`/`false` | 是否正在游泳  |

## 玩家聊天事件

|    **字段名**     |     **数据类型**      |       **可能的值**       |   **说明**   |
|:--------------:|:-----------------:|:--------------------:|:----------:|
|  server_name   |      string       |          -           | 收到事件的服务器名称 |
| server_version |      string       |          -           |   游戏版本号    |
|  server_type   |      string       |          -           |   服务端类型    |
|   post_type    |      string       |      `message`       |    上报类型    |
|    sub_type    |      string       |        `chat`        |    子类型     |
|   event_name   |      string       | `ServerMessageEvent` |    事件名称    |
|     player     | [Player](#player) |          -           |  发送消息的玩家   |
|    message     |      string       |          -           |   发送的消息    |

## 玩家命令事件

|    **字段名**     |     **数据类型**      |          **可能的值**           |   **说明**   |
|:--------------:|:-----------------:|:---------------------------:|:----------:|
|  server_name   |      string       |              -              | 收到事件的服务器名称 |
| server_version |      string       |              -              |   游戏版本号    |
|  server_type   |      string       |              -              |   服务端类型    |
|   post_type    |      string       |          `message`          |    上报类型    |
|    sub_type    |      string       |      `player_command`       |    子类型     |
|   event_name   |      string       | `ServerCommandMessageEvent` |    事件名称    |
|     player     | [Player](#player) |              -              |  发送消息的玩家   |
|    message     |      string       |              -              |   发送的消息    |

## 玩家死亡事件

|    **字段名**     |     **数据类型**      |              **可能的值**               |   **说明**   |
|:--------------:|:-----------------:|:-----------------------------------:|:----------:|
|  server_name   |      string       |                  -                  | 收到事件的服务器名称 |
| server_version |      string       |                  -                  |   游戏版本号    |
|  server_type   |      string       |                  -                  |   服务端类型    |  
|   post_type    |      string       |              `notice`               |    上报类型    |
|    sub_type    |      string       |               `death`               |    子类型     |
|   event_name   |      string       | `ServerLivingEntityAfterDeathEvent` |    事件名称    |
|     player     | [Player](#player) |                  -                  |   重生的玩家    |
|    message     |      string       |                  -                  |   发送的消息    |

## 玩家加入事件

|    **字段名**     |     **数据类型**      |            **可能的值**             |   **说明**   |
|:--------------:|:-----------------:|:-------------------------------:|:----------:|
|  server_name   |      string       |                -                | 收到事件的服务器名称 |
| server_version |      string       |                -                |   游戏版本号    |
|  server_type   |      string       |                -                |   服务端类型    |
|   post_type    |      string       |            `notice`             |    上报类型    |
|    sub_type    |      string       |             `join`              |    子类型     |
|   event_name   |      string       | `ServerPlayConnectionJoinEvent` |    事件名称    |
|     player     | [Player](#player) |                -                |   加入的玩家    |

## 玩家离开事件

|    **字段名**     |     **数据类型**      |               **可能的值**                |   **说明**   |
|:--------------:|:-----------------:|:-------------------------------------:|:----------:|
|  server_name   |      string       |                   -                   | 收到事件的服务器名称 |
| server_version |      string       |                   -                   |   游戏版本号    |
|  server_type   |      string       |                   -                   |   服务端类型    |  
|   post_type    |      string       |               `notice`                |    上报类型    |
|    sub_type    |      string       |                `quit`                 |    子类型     |
|   event_name   |      string       | `ServerPlayConnectionDisconnectEvent` |    事件名称    |
|     player     | [Player](#player) |                   -                   |   离开的玩家    |
