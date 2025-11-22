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
| `text`  | `str` | -            | 成就事件的文本 |

## Display

| **字段名**    | **数据类型** | **可能的值** | **说明**     |
| :------------ | :----------- | :----------- | :----------- |
| `title`       | `str`        | -            | 标题的 `Key`    |
| `description` | `str`        | -            | 描述的 `Key`    |
| `frame`       | `str`        | `task`/`goal`/`challenge` | 显示框架类型 |
