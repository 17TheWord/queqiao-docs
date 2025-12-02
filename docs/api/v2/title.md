# 🛰️ WebSocket 接口文档

## 📡 接口名称

**标题推送接口（`send_title`）**

---

## 🧭 字段描述

| 字段路径 | 类型 | 默认值 | 说明 |
|-----------|------|--------|------|
| `title` | `json` | `-` | 主标题，参考 [Minecraft 文本组件](https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6)。 |
| `subtitle` | `json` | `-` | 副标题，可选，参考 [Minecraft 文本组件](https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6)。 |
| `fade_in` | `integer` | `20` | 标题淡入时间，单位 `ticks`（1 秒 = 20 `ticks`）。 |
| `stay` | `integer` | `70` | 标题停留时间，单位 `ticks`。 |
| `fade_out` | `integer` | `20` | 标题淡出时间，单位 `ticks`。 |

> - `TItle` 与 `SubTitle` 至少传递一个

---

## 🧱 数据结构

### 🔹 消息格式

```json
{
    "api": "send_title",
    "data": {
        "title": {
            "text": "Title",
            "color": "aqua"
        },
        "subtitle": {
            "text": "Sub Title"
        },
        "fade_in": 20,
        "stay": 70,
        "fade_out": 20
    },
    "echo": "1"
}
```

### 🔹 返回信息

```json
{
    "code": 200,
    "api": "send_title",
    "post_type": "response",
    "status": "SUCCESS",
    "message": "success",
    "echo": "1"
}
```
