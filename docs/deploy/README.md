# 快速开始

1. 前往 [Modrinth](https://modrinth.com/plugin/queqiao) 或 [CurseForge](https://www.curseforge.com/minecraft/mc-mods/queqiao) 下载并安装服务端对应的 `插件/Mod`。
2. 配置 [`config.yml`](../config/README.md) 中的 `websocket_server`

    ```yaml
    websocket_server:
      enable: true          # 是否启用
      host: "127.0.0.1"     # WebSocket Server 地址
      port: 8080            # WebSocket Server 端口
    ```

3. 启动服务器，等待开启 `Websocket Server`
4. 使用 ApiFox 或其他API测试工具，或连接 [对接项目](../integration/README.md#对接项目)
    - 配置全局 `Request Header`

    ```json5
    {
      // 必填
      // 服务器名称，必须与 config.yml 中的 'server_name' 一致。
      "x-self-name": "TestServer",
      // 选填
      // 鉴权，Bearer 后的内容必须与 config.yml 中的 'access_token' 一致,如果 config.yml 中的 'auth_token' 为空，则可不设置此项。
      "Authorization": "Bearer 123",
      // 选填（建议填写）
      // 用于标记对接项目来源，例如鹊桥中该项为 "minecraft"，nonebot 适配器中该项为 "nonebot"，如果填写该项，应该拒绝相同来源的重复连接。
      // 若为空，则不检查重复连接，但不建议留空。
      "x-client-origin": "custom-integration"
    }
    ```

5. 开始游戏，加入服务器
6. 参考 [API 文档](../api/v2/README.md)，使用对应接口发送消息，或监听玩家事件。
