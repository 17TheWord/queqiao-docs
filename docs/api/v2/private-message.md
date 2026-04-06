# 🛰️ WebSocket 接口文档

## 📡 接口名称

**私聊消息接口（`send_private_msg`）**

---

## 🧭 字段描述

| 字段路径 | 类型 | 默认值 | 说明 |
|-----------|------|--------|------|
| `uuid` | `string` | `-` | 接收者 `UUID`（优先使用），可选，如果为空则使用 `nickname`。 |
| `nickname` | `string` | `-` | 接收者昵称，当 `uuid` 为空时使用。 |
| `message` | `json` | `-` | 私聊消息内容。参考 [Minecraft 文本组件](https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6)。 |

> - 发送的聊天消息会在前方添加前缀，默认为：`[鹊桥]`
>
> - `uuid` 与 `nickname` 至少传递一个
> 若都传递，则优先使用 `uuid`

---

## 🧱 数据结构

### 🔹 消息格式

```json
{
    "api": "send_private_msg",
    "data": {
        "uuid": null,
        "nickname": "17TheWord",
        "message": [
            {
                "text": "[私聊消息]",
                "color": "aqua"
            },
            {
                "text": "说:",
                "color": "white"
            },
            {
                "text": "聊天内容",
                "color": "white"
            }
        ]
    },
    "echo": "1"
}
```

### 🔹 返回信息

- 正常返回

```json
{
    "code": 200,
    "api": "send_private_msg",
    "post_type": "response",
    "status": "SUCCESS",
    "message": "success",
    "data": {
        "target_player": {
            "nickname": "string",
            "uuid": "string",
            "is_op": true,
            "address": "string",
            "health": 0,
            "max_health": 0,
            "experience_level": 0,
            "experience_progress": 0,
            "total_experience": 0,
            "walk_speed": 0,
            "x": 0,
            "y": 0,
            "z": 0
        },
        "message": "Send private message success."
    },
    "echo": "1"
}
```

---

- `uuid`/`nickname` 均为空

```json
{
    "code": 400,
    "api": "send_private_msg",
    "post_type": "response",
    "status": "FAILED",
    "message": "success",
    "data": null,
    "echo": "1"
}
```

---

- 待补充……
