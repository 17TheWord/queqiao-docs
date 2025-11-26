# PlayerCommandEvent

| 字段名         | 数据类型 | 可能的值        | 说明         |
| :------------- | :------- | :-------------- | :----------- |
| `timestamp`    | `int`    | -               | 事件时间戳   |
| `post_type`    | `str`    | `message`       | 事件类型     |
| `event_name`   | `str`    | `PlayerCommandEvent` | 事件名   |
| `server_name`  | `str`    | -               | 服务器名称   |
| `server_version`| `str`   | -               | 服务器版本   |
| `server_type`  | `str`    | -               | 服务器类型   |
| `sub_type`     | `str`    | `player_command`| 事件子类型   |
| `message_id`   | `str`    | -               | 消息 ID      |
| `raw_message`  | `str`    | -               | 原始消息内容 |
| `player`       | [`Player`](../model/player.md#player) | -               | 玩家对象     |
| `command`      | `str`    | -               | 玩家输入的命令内容 |

::: tip
可以对命令消息进行监听和处理，搭配 `Rcon` 实现模组服中无权限管理插件的简单TP命令功能。
:::

## 服务端支持情况

- 不支持 `原版端`、`Velocity`
