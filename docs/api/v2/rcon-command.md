# 🛰️ WebSocket 接口文档

## 📡 接口名称

**远程控制命令接口（`send_rcon_command`）**

---

## 🧭 字段描述

| 字段路径 | 类型 | 默认值 | 说明 |
|-----------|------|--------|------|
| `command` | `string` | - | 要执行的 RCON 命令字符串。 |

---

## 🧱 数据结构

### 🔹 消息格式

```json
{
    "api": "send_rcon_command",
    "data": {
        "command": "list"
    },
    "echo": "1"
}
```

### 🔹 返回信息

```json
{
    "code": 200,
    "post_type": "response",
    "status": "SUCCESS",
    "message": "success",
    "data": "There are 0 of a max of 20 players online: ",
    "echo": "1"
}
```
