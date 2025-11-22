# 🌐 Protocol V2 接口文档

当前 **V2 协议版本** 适用于 `v0.2.11` 及以上版本的鹊桥服务端插件/Mod。

> ✨ 提示  
>
> 1. V2 版本弃用了手动解析 JSON 为 Minecraft 消息组件的功能。  
> 2. 使用服务端 API 直接将 `JsonElement` 转换为 Minecraft 消息组件。  
> 3. 消息组件格式请参考 [`Minecraft 文本组件`](https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6)。

---

## 📝 Websocket Json 请求说明

```json
{
  "api": "接口名称，例如：'broadcast'",
  "data": {
    "参数名": "参数值",
    "参数名2": "参数值"
  },
  "echo": "'回声', 如果指定了 echo 字段, 那么响应包也会同时包含一个 echo 字段, 它们会有相同的值"
}
```

---

## 📂 接口概览

| 接口名称 | API | 消息方向 | 功能描述 |
|----------|------------|----------|----------|
| 广播消息接口 | `broadcast` | 服务器 → 客户端 | 向所有客户端广播聊天消息 |
| 标题推送接口 | `send_title` | 服务器 → 客户端 | 向客户端显示主标题与副标题 |
| 状态栏消息接口 | `send_actionbar` | 服务器 → 客户端 | 在客户端状态栏显示即时提示 |
| 私聊消息接口 | `send_private_msg` | 服务器 → 客户端 | 向指定玩家发送私聊消息，支持 UUID 或昵称定位 |
| 远程控制命令接口 | `send_rcon_command` | 客户端 → 服务器 | 发送 RCON 命令至服务器执行，并返回执行结果 |

---

## 🔹 广播消息接口 (`broadcast`)

**用途**：向所有客户端广播聊天消息，消息内容使用 Minecraft 文本组件格式  
**示例请求**

```json
{
  "api": "broadcast",
  "data": {
    "message": [
      { "text": " [群名1]", "color": "aqua" },
      { "text": " 用户", "color": "green" },
      { "text": "说:", "color": "white" },
      { "text": "聊天内容", "color": "white" }
    ]
  },
  "echo": "1"
}
```
