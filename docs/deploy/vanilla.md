# 原版 & 独立程序

> 针对 `原版端` 以及其他不支持的服务端类型。

1. 服务端开启 `Rcon`，用于**发送消息**/**执行命令**至游戏。

2. 前往 [Releases](https://github.com/17TheWord/QueQiao/releases) 页面下载日志读取程序，丢到服务端核心目录，编写 `.sh` 或 `.bat` 脚本，执行独立程序。

    ```shell
    java -Xms256M -Xmx512M -jar QueQiao-minecraft+origin-x.x.x.jar
    ```

3. 配置文件将生成至 `./config/QueQiao/config.yml`，内容 [示例参考](../config/vanilla.md)。

4. 参考使用的服务端实际情况，如果有需要，请进行以下修改：
    - 修改日志路径。
    - 修改**聊天**、**加入**、**离开**事件的正则规则以匹配你的服务端日志内容。

5. 对接端需要使用 `Rcon`，将信息发送至游戏内，具体可以修改 [配置文件](../config/README.md) 中 Rcon 部分，填写对应信息并启用，例如：

    ```yaml
    rcon:
      enable: true
      port: 25575
      password: your_rcon_password
    ```

6. 启动独立程序，连接 ApiFox 或其他对接端，等待事件分发或使用 [`send_rcon_command`](../api/v2/rcon-command.md) 接口发送消息或执行其他命令。

> **注意**
>
> - 如果你使用的是 `V1 协议(v0.2.7及以下)` 的鹊桥，则需要对接端实现 `Rcon` 的连接，因为 `V1 协议` 的鹊桥并未提供 `Rcon` 功能。
> - `原版端` 以及其他不支持的服务端类型，可能会因为日志格式不统一而导致部分事件无法正确识别，请根据实际情况调整正则表达式。
> - 请确保 `Rcon` 功能已正确开启，否则将无法发送消息或执行命令。
