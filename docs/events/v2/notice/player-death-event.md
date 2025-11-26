# PlayerDeathEvent

| 字段名         | 数据类型 | 可能的值        | 说明         |
| :------------- | :------- | :-------------- | :----------- |
| `timestamp`    | `int`    | -               | 事件时间戳   |
| `post_type`    | `str`    | `notice`        | 通知事件类型 |
| `event_name`   | `str`    | `PlayerDeathEvent` | 事件名     |
| `server_name`  | `str`    | -               | 服务器名称   |
| `server_version`| `str`   | -               | 服务器版本   |
| `server_type`  | `str`    | -               | 服务器类型   |
| `sub_type`     | `str`    | `player_death`  | 事件子类型   |
| `player`       | [`Player`](../model/player.md#player) | -               | 玩家对象     |
| `death`        | [`Death`](#death) | -         | 死亡详情     |

## Death

| 字段名      | 数据类型   | 可能的值 | 说明           |
| :---------- | :--------- | :------- | :------------- |
| `key`       | `str`      | -        | 用于翻译的 Key |
| `args`      | `list[str]`| -        | 翻译参数列表   |
| `text`      | `str`      | -        | 死亡消息内容   |

::: tip
可通过以下方式拼接成玩家死亡消息

```python
death_message = f"[{event.server_name}] {event.death.text}"

[Server] 玩家A was slain by Zombie
```

:::

## 服务端支持情况

- 不支持 `原版端`、`Velocity`
