# Player

| **字段名**            | **数据类型** | **可能的值** | **说明**                |
| :-------------------- | :----------- | :----------- | :---------------------- |
| `nickname`            | `str`        | -            | 玩家昵称                |
| `uuid`                | `UUID`       | -            | 玩家 UUID               |
| `is_op`               | `bool`       | -            | 玩家是否为管理员        |
| `address`             | `str`        | -            | 玩家 IP 地址            |
| `health`              | `float`      | -            | 当前生命值              |
| `max_health`          | `float`      | -            | 最大生命值              |
| `experience_level`    | `int`        | -            | 玩家经验等级            |
| `experience_progress` | `float`      | -            | 当前经验进度（0.0–1.0） |
| `total_experience`    | `int`        | -            | 玩家总经验值            |
| `walk_speed`          | `float`      | -            | 行走速度                |
| `x`                   | `float`      | -            | 坐标 X                  |
| `y`                   | `float`      | -            | 坐标 Y                  |
| `z`                   | `float`      | -            | 坐标 Z                  |

## 字段缺失统计

- `原版端` 仅支持 `nickname`
- `Spigot`：不支持 `max_health`
- `Paper`：不支持 `max_health`
- `Folia`：
  - 不支持 `max_health`
  - 可能缺失 `address`
- `Velocity` 仅支持 `nickname`、`uuid`、`is_op`
- `Forge`
  - `1.7.10`：缺少 `address`
