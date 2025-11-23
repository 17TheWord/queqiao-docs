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
