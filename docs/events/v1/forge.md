# Forge 事件

## Player

|   **字段名**   | **数据类型** |                   **可能的值**                    | **说明**  |
|:-----------:|:--------:|:---------------------------------------------:|:-------:|
|  nickname   |  string  |                       -                       |  玩家昵称   |
|    uuid     |  string  |                       -                       | 玩家 UUID |
|  ipAddress  |  string  |                       -                       |  玩家 IP  |
|    speed    |  float   |                       -                       |  玩家速度   |
|  is_flying  |   bool   |                `true`/`false`                 | 玩家是否飞行  |
| is_swimming |   bool   |                `true`/`false`                 | 玩家是否游泳  |
| is_sleeping |   bool   |                `true`/`false`                 | 玩家是否睡觉  |
| is_blocking |   bool   |                `true`/`false`                 | 玩家是否阻挡  |
|  game_mode  |   str    | `survival`/`creative`/`adventure`/`spectator` | 玩家游戏模式  |
|   block_x   |   int    |                       -                       |  X 坐标   |
|   block_y   |   int    |                       -                       |  Y 坐标   |
|   block_z   |   int    |                       -                       |  Z 坐标   |

## 玩家聊天事件

|    **字段名**     |     **数据类型**      |     **可能的值**      |   **说明**   |
|:--------------:|:-----------------:|:-----------------:|:----------:|
|  server_name   |      string       |         -         | 收到事件的服务器名称 |
| server_version |      string       |         -         |   游戏版本号    |
|  server_type   |      string       |         -         |   服务端类型    |
|   post_type    |      string       |     `message`     |    上报类型    |
|    sub_type    |      string       |      `chat`       |    子类型     |
|   event_name   |      string       | `ServerChatEvent` |    事件名称    |
|     player     | [Player](#player) |         -         |  发送消息的玩家   |
|    message     |      string       |         -         |   发送的消息    |

## 玩家死亡(重生)事件

|    **字段名**     |     **数据类型**      |      **可能的值**      |   **说明**   |
|:--------------:|:-----------------:|:------------------:|:----------:|
|  server_name   |      string       |         -          | 收到事件的服务器名称 |
| server_version |      string       |         -          |   游戏版本号    |
|  server_type   |      string       |         -          |   服务端类型    |
|   post_type    |      string       |     `message`      |    上报类型    |
|    sub_type    |      string       |      `death`       |    子类型     |
|   event_name   |      string       | `PlayerDeathEvent` |    事件名称    |
|     player     | [Player](#player) |         -          |   重生的玩家    |
|    message     |      string       |         -          |  死亡广播的消息   |

## 玩家命令事件

|    **字段名**     |     **数据类型**      |     **可能的值**     |   **说明**   |
|:--------------:|:-----------------:|:----------------:|:----------:|
|  server_name   |      string       |        -         | 收到事件的服务器名称 |
| server_version |      string       |        -         |   游戏版本号    |
|  server_type   |      string       |        -         |   服务端类型    |
|   post_type    |      string       |    `message`     |    上报类型    |
|    sub_type    |      string       | `player_command` |    子类型     |
|   event_name   |      string       |  `CommandEvent`  |    事件名称    |
|     player     | [Player](#player) |        -         |  发送命令的玩家   |
|    message     |      string       |        -         |    命令内容    |

## 玩家加入事件

|    **字段名**     |     **数据类型**      |       **可能的值**        |   **说明**   |
|:--------------:|:-----------------:|:---------------------:|:----------:|
|  server_name   |      string       |           -           | 收到事件的服务器名称 |
| server_version |      string       |           -           |   游戏版本号    |
|  server_type   |      string       |           -           |   服务端类型    |  
|   post_type    |      string       |       `notice`        |    上报类型    |
|    sub_type    |      string       |        `join`         |    子类型     |
|   event_name   |      string       | `PlayerLoggedInEvent` |    事件名称    |
|     player     | [Player](#player) |           -           |   加入的玩家    |

## 玩家离开事件

|    **字段名**     |     **数据类型**      |        **可能的值**        |   **说明**   |
|:--------------:|:-----------------:|:----------------------:|:----------:|
|  server_name   |      string       |           -            | 收到事件的服务器名称 |
| server_version |      string       |           -            |   游戏版本号    |
|  server_type   |      string       |           -            |   服务端类型    |  
|   post_type    |      string       |        `notice`        |    上报类型    |
|    sub_type    |      string       |         `quit`         |    子类型     |
|   event_name   |      string       | `PlayerLoggedOutEvent` |    事件名称    |
|     player     | [Player](#player) |           -            |   离开的玩家    |
