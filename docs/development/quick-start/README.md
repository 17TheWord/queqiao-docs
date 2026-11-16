# 快速开发流程

::: tip 版本提示
本开发文档适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。此前的 `queqiao-tool` 接入方式已不再使用。
:::

- 本案例以 `cleanroom-1.12.2` 为参考实现，其他版本可通过 `IDEA` 的 `Minecraft Development` 插件生成模板。
- 从 `0.7.0-beta.4` 起，各服务端插件/模组的共用代码统一由 **QueQiao Core** 提供，发布在 Maven Central，不再需要配置 GitHub Maven Packages 与只读令牌。

## 职责划分

| 模块 | 负责内容 |
| --- | --- |
| Core | 配置加载、WebSocket、RCON、命令路由、事件模型、翻译服务 |
| 平台适配 | 实现 `PlatformContext`（消息收发、玩家模型），监听服务端事件并转换为 core 事件 |

## 核心依赖

```gradle
dependencies {
    implementation "io.github.17theword.queqiao:core:0.7.0-beta.4"
}
```

## 从 queqiao-tool 迁移对照

| queqiao-tool | QueQiao Core |
| --- | --- |
| `GlobalContext.init(...)` | `QueQiaoRuntime.create(context)` + `runtime.start()` |
| `GlobalContext.shutdown()` | `runtime.shutdown()` |
| `GlobalContext.sendEvent(event)` | `runtime.sendEvent(event)` |
| `GlobalContext.getConfig().getSubscribeEvent().isPlayerChat()` | `runtime.getConfig().get(ConfigKeys.SubscribeEvent.PLAYER_CHAT)` |
| `GlobalContext.translate(key, args)` | 由 `PlatformContext#getTranslationService()` 提供 |
| `HandleApiService` / `HandleApiImpl` | 继承 `AbstractPlatformContext` 的 `PlatformContext` |
| `HandleCommandReturnMessageService` | `CommandExecutionContext`（`reply` / `hasPermission`） |
| `RootCommand` / `SubCommand` / `AbstractCommand` | `CommandRouter` / `createDeferredCommandTree` |
| `Tool.isIgnoredCommand(...)` | `runtime.utils.isIgnoredCommand(...)` |
| `ServerTypeConstant`（tool 包） | `io.github.theword.queqiao.core.constant.ServerTypeConstant` |
| GitHub Packages 私有仓库 | Maven Central |

## 接下来

1. [初始化](./init.md)：配置依赖与目录。
2. [主类编写](./main-class.md)：创建并启动 `QueQiaoRuntime`。
3. [平台上下文](./handle/api.md)：实现 `AbstractPlatformContext`。
4. [事件监听](./event-listener.md)：把服务端事件转换为 core 事件。
5. [命令执行上下文](./handle/command-return.md) 与 [命令](./commands.md)。
6. [工具类](./utils/tool.md)：玩家模型与组件转换。

::: warning 线程契约
Core 不保证通过 `PlatformContext` 调用的平台方法运行在主线程：WebSocket 工作线程也可能直接调用它们。
如果平台 API 有线程要求，需要由平台实现自行调度。
:::
