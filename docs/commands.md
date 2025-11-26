# 命令

## 帮助

- 获取该插件/模组的帮助

```shell
/queqiao help
```

权限节点：`queqiao.help`

## 重载

- 重新加载 `config.yml` 配置文件，重启 `websocket`

```shell
/queqiao reload
```

权限节点：`queqiao.reload`

## Client

- 将处于关闭状态的 `Websocket Client` 重新连接
- 可选参数：
  - `all`：强制重新连接所有 `Websocket Client`

```shell
/queqiao client reconnect [all]
```

权限节点：`queqiao.client.reconnect`

## Server

- 暂无命令...

## 特殊说明

- Mod端对权限的判定为 `int` Level
- 对本模组所有命令权限定义为：`2`
