# 对接指南

本页面将指导如何与鹊桥完成对接。但最简单的示例已在 [快速开始](../deploy/README.md) 中给出，建议先阅读快速开始章节。

## Websocket

鹊桥提供 `正向 Websocket` 与 `反向 Websocket` 两种连接方式，任选其一即可。

## Header

在使用 `正向 Websocket` 或 `反向 Websocket` 连接时，请务必在连接时携带以下 `Header`：

```json5
{
  // 必填
  // 服务器名称，必须与 config.yml 中的 'server_name' 一致。
  "x-self-name": "TestServer",
  // 选填
  // 鉴权，必须与 config.yml 中的 'access_token' 一致,如果 config.yml 中的 'auth_token' 为空，则可不设置此项。
  "Authorization": "Bearer 123",
  // 选填（建议填写）
  // 用于标记对接项目来源，例如鹊桥中该项为 "minecraft"，nonebot 适配器中该项为 "nonebot"，如果填写该项，应该拒绝相同来源的重复连接。
  // 若为空，则不检查重复连接，但不建议留空。
  "x-client-origin": "custom-integration"
}
```

## API

对接项目可以参考 [API 文档](../api/v2/README.md) 使用对应接口发送消息，或监听玩家事件。

## 事件

对接项目可以参考 [事件文档](../events/v2/README.md) 编写各个事件的模型。
