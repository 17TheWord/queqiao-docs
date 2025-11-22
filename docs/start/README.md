# 快速开始

1. 安装服务端对应的 `插件/Mod`
2. 配置 `config.yml` 中的 `websocket_server`
    - `enable: true` # 是否启用
    - `host: "127.0.0.1"`     # WebSocket Server 地址
    - `port: 8080` # WebSocket Server 端口
3. 启动服务器，等待开启 `Websocket Server`
4. 使用 [`ApiFox`](https://apifox.com/) 或其他API测试工具，或连接 [`对接`](#对接) 项目
    - 配置全局 `Request Header`

      ```json5
      {
        // 必填
        // 服务器名称，必须与 config.yml 中的 'server_name' 一致
        "x-self-name": "TestServer",
        // 选填
        // 鉴权，必须与 config.yml 中的 'access_token' 一致,如果 config.yml 中的 'auth_token' 为空，则可不设置此项
        "Authorization": "Bearer 123"
      }
      ```

5. 开始游戏，加入服务器
6. 参考 [`API文档`](https://queqiao.apifox.cn/68642911f0)，使用对应接口发送消息，或监听玩家事件
