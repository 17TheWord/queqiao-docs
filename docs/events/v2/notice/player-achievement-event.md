# PlayerAchievementEvent

| 字段名         | 数据类型 | 可能的值        | 说明         |
| :------------- | :------- | :-------------- | :----------- |
| `timestamp`    | `int`    | -               | 事件时间戳   |
| `post_type`    | `str`    | `notice`        | 通知事件类型 |
| `event_name`   | `str`    | `PlayerAchievementEvent` | 事件名 |
| `server_name`  | `str`    | -               | 服务器名称   |
| `server_version`| `str`   | -               | 服务器版本   |
| `server_type`  | `str`    | -               | 服务器类型   |
| `sub_type`     | `str`    | `player_achievement` | 事件子类型 |
| `player`       | [`Player`](../model/player.md#player) | -               | 玩家对象     |
| `achievement`  | [`Achievement`](#achievement) | -           | 成就详情     |

## Achievement

| **字段名** | **数据类型**                    | **可能的值** | **说明**     |
| :--------- | :------------------------------ | :----------- | :----------- |
| `key`  | `str` | -            | 成就资源文件中的 `Key` |
| `display`  | [`Display`](#display) | -            | 成就显示信息 |
| `text`  | `str` | -            | 成就事件的文本 (`0.4.1+` 不再支持该字段) |
| `translate`  | [`Translate`](../model/translate.md) | -            | 成就事件的文本 (`0.4.1+` 起新增该字段，并采用 [`Translate`](../model/translate.md)) |

::: tip
可通过以下方式拼接成就获得消息

- `0.4.1+` 需通过通过 `event.achievement.translate.text` 拿到成就文本

```python
achievement_message = f"[{event.server_name}] {event.achievement.translate.text}"

[Server] 玩家A has earned the achievement [Getting Wood]
```

- `0.4.0` 及以下需通过 `event.achievement.text` 拿到成就文本

```python
achievement_message = f"[{event.server_name}] {event.achievement.text}"

[Server] 玩家A has earned the achievement [Getting Wood]
```

:::

## Display

| **字段名**    | **数据类型** | **可能的值** | **说明**     |
| :------------ | :----------- | :----------- | :----------- |
| `title`       | `str`/[`Translate`](../model/translate.md)        | -            | 标题的 `Key` (`0.4.1+` 采用 [`Translate`](../model/translate.md))    |
| `description` | `str`/[`Translate`](../model/translate.md)        | -            | 描述的 `Key` (`0.4.1+` 采用 [`Translate`](../model/translate.md))    |
| `frame`       | `str`        | `task`/`goal`/`challenge` | 显示框架类型 |

## 服务端支持情况

- 不支持 `原版端`、`Velocity`

## 字段缺失统计

- `Spigot` 仅包含 `key`
- `Forge`
  - `1.7.10`：缺失 `achievement.display.description`
