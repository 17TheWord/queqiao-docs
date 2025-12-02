# 🛰️ WebSocket 接口文档

## 📡 接口名称

**广播消息接口（`broadcast`）**

---

## 🧭 字段描述

| 字段路径 | 类型 | 默认值 | 说明 |
|-----------|------|--------|------|
| `message` | `json` | `-` | 消息内容。参考 [Minecraft 文本组件](https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6)。 |

---

## 🧱 数据结构

### 🔹 消息格式

> 发送的聊天消息会在前方添加前缀，默认为：`[鹊桥]`

```json
{
    "api": "broadcast",
    "data": {
        "message": [
            {
                "text": " [群名1]",
                "color": "aqua"
            },
            {
                "text": " 用户",
                "color": "green"
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

```json
{
    "code": 200,
    "api": "broadcast",
    "post_type": "response",
    "status": "SUCCESS",
    "message": "success",
    "echo": "1"
}
```
