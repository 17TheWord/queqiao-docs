# PlayerQuitEvent

| 字段名         | 数据类型 | 可能的值        | 说明         |
| :------------- | :------- | :-------------- | :----------- |
| `timestamp`    | `int`    | -               | 事件时间戳   |
| `post_type`    | `str`    | `notice`        | 通知事件类型 |
| `event_name`   | `str`    | `PlayerQuitEvent` | 事件名     |
| `server_name`  | `str`    | -               | 服务器名称   |
| `server_version`| `str`   | -               | 服务器版本   |
| `server_type`  | `str`    | -               | 服务器类型   |
| `sub_type`     | `str`    | `player_quit`   | 事件子类型   |
| `player`       | [`Player`](../model/player.md#player) | -               | 玩家对象     |

::: tip
可通过以下方式拼接成玩家退出消息

```python
quit_message = f"[{event.server_name}] {event.player.nickname} 离开了游戏"

[Server] 玩家A 离开了游戏
```

:::
