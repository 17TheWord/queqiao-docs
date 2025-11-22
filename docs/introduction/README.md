
# 鹊桥

✨ Minecraft 服务端 Mod/Plugin，实时接收玩家事件、API 广播消息 ✨

[GitHub 仓库](https://github.com/17TheWord/QueQiao) ｜ [Wiki 文档](https://github.com/17TheWord/QueQiao/wiki) ｜ [Modrinth 下载](https://modrinth.com/plugin/queqiao) ｜ [CurseForge 下载](https://www.curseforge.com/minecraft/mc-mods/queqiao)

## 项目简介

鹊桥是一个适用于多种 Minecraft 服务端的 Mod/Plugin，能够实时分发玩家事件，并通过 WebSocket 与外部系统进行消息互通。支持多种服务端类型，适合群聊、机器人、跨平台消息同步等场景。

## 主要功能

- **玩家事件分发**：实时推送玩家加入、离开、聊天、命令、成就、死亡等事件。
- **API 消息广播**：支持广播、私聊、标题、动画栏等多种消息接口。
- **多服务端兼容**：Vanilla、Spigot、Paper、Forge、Fabric、NeoForge、Folia、Velocity。
- **权限管理**：提供权限节点，支持权限插件进行管理。
- **命令交互**：通过 Rcon 实现服务端命令下发与反馈。

## 对接

- [`@17TheWord/nonebot-adapter-minecraft`](https://github.com/17TheWord/nonebot-adapter-minecraft)：`NoneBot2` 适配器
- [`@17TheWord/nonebot-plugin-mcqq`](https://github.com/17TheWord/nonebot-plugin-mcqq)：`NoneBot2` 插件，支持 `OneBot`
  和 `QQ` 适配器实现互通聊天。
- [`@CikeyQi/mc-plugin`](https://github.com/CikeyQi/mc-plugin)：`mcqq` 的 `YunZai` 插件实现。
- [`@Twiyan0/koishi-plugin-minecraft-sync-msg`](https://github.com/Twiyin0/koishi-plugin-minecraft-sync-msg)：`mcqq` 的 `Koishi` 插件实现。
- [`@17TheWord/zerobot-plugin-mcqq`](https://github.com/17TheWord/zerobot-plugin-mcqq)：`mcqq` 的 `ZeroBot` 插件实现。
- [`@kterna/astrbot_plugin_mcqq`](https://github.com/kterna/astrbot_plugin_mcqq)：`mcqq` 的 `AstrBot` 插件实现。
- [`@KroMiose/nekro-agent`](https://github.com/KroMiose/nekro-agent)：更智能、更优雅的代理执行 `AI`

## 相关项目

- [`@kterna/queqiao_mcdr`](https://github.com/kterna/queqiao_mcdr)：鹊桥的 `MCDR` 实现。

## 兼容

- [`@kitUIN/ChatImage`](https://github.com/kitUIN/ChatImage)：在 `Minecraft` 聊天栏中显示图片

## 社群

- [`Discord`](https://discord.gg/SBUkMYsyf2)

## 特别感谢

- [`@kitUIN`](https://github.com/kitUIN)：提供代码上的帮助以及构建工具
- [`@kitUIN/ModMultiVersion`](https://github.com/kitUIN/ModMultiVersion)：`IDEA` 多版本 `MOD` 插件
- [`@kitUIN/ModMultiVersionTool`](https://github.com/kitUIN/ModMultiVersionTool)：多版本 `MOD` 构建工具

## 贡献与支持

- 觉得好用可以给这个项目点个 `Star` 或者去 [`爱发电`](https://afdian.com/a/17TheWord) 投喂我。

- 有意见或者建议也欢迎提交 [`Issues`](https://github.com/17TheWord/QueQiao/issues)
  和 [`Pull requests`](https://github.com/17TheWord/QueQiao/pulls) 。

## 开源许可

本项目使用 [`MIT`](https://github.com/17TheWord/QueQiao/blob/main/LICENSE) 作为开源许可证。
