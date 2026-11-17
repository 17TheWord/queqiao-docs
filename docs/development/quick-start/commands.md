# 命令

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。`SubCommand` / `AbstractCommand` / `ReloadCommandAbstract` 等旧命令类已被移除。
:::

命令树由 core 提供（`help`、`reload`、`server`、`client` 等内置子命令），平台侧只需要把 core 的命令树映射到自己的命令 API。

## 两种接入方式

### 1. 运行时已启动：createCommandRouter

适合大多数平台（Bukkit、Velocity、Forge 1.12.2 等）：

```java
CommandRouter<ICommandSender> router = runtime.createCommandRouter();
router.execute(new ForgeCommandContext(sender), args);
router.tabComplete(new ForgeCommandContext(sender), args);
```

- 路由依赖运行时状态，因此按当前 `QueQiaoRuntime` 实例惰性创建并缓存；运行时重建后需要重新创建。

### 2. 平台使用 Brigadier：createDeferredCommandTree

Forge 1.18+、NeoForge、Fabric 等可以在运行时启动前构建完整命令树：

```java
RootCommand<CommandSourceStack> root = QueQiaoRuntime.createDeferredCommandTree(LOGGER, QueQiao::getRuntime);
event.getDispatcher().register(registerCommand(root));
```

- 命令树内部的依赖都以 `Supplier` 注入，只有真正执行命令时才读取运行时。
- 把 `CommandNode` 递归映射为 `LiteralArgumentBuilder`，执行时调用 `node.execute(上下文, 参数)`。

## 参考

::: details Forge 1.12.2：CommandBase

```java
package com.github.theword.queqiao.command;

import com.github.theword.queqiao.QueQiao;
import io.github.theword.queqiao.core.command.CommandRouter;
import io.github.theword.queqiao.core.constant.BaseConstant;
import io.github.theword.queqiao.core.constant.CommandConstant;
import io.github.theword.queqiao.core.runtime.QueQiaoRuntime;
import net.minecraft.command.CommandBase;
import net.minecraft.command.ICommandSender;
import net.minecraft.server.MinecraftServer;
import net.minecraft.util.math.BlockPos;
import net.minecraft.util.text.TextComponentString;

import javax.annotation.Nullable;
import java.util.Collections;
import java.util.List;

public class CommandExecutor extends CommandBase {

    private QueQiaoRuntime cachedRuntime;

    private CommandRouter<ICommandSender> cachedRouter;

    @Override
    public int getRequiredPermissionLevel() {
        return CommandConstant.MOD_PERMISSION_LEVEL;
    }

    @Override
    public boolean checkPermission(MinecraftServer server, ICommandSender sender) {
        return sender.canUseCommand(getRequiredPermissionLevel(), getName());
    }

    @Override
    public List<String> getTabCompletions(MinecraftServer server, ICommandSender sender,
                                          String[] args, @Nullable BlockPos targetPos) {
        QueQiaoRuntime runtime = QueQiao.getRuntime();
        if (runtime == null) return Collections.emptyList();

        return router(runtime).tabComplete(new ForgeCommandContext(sender), args);
    }

    @Override
    public String getName() {
        return BaseConstant.COMMAND_HEADER;
    }

    @Override
    public String getUsage(ICommandSender sender) {
        return "/" + BaseConstant.COMMAND_HEADER;
    }

    @Override
    public void execute(MinecraftServer server, ICommandSender sender, String[] args) {
        QueQiaoRuntime runtime = QueQiao.getRuntime();
        if (runtime == null) {
            sender.sendMessage(new TextComponentString(CommandConstant.RUNTIME_NOT_READY));
            return;
        }

        router(runtime).execute(new ForgeCommandContext(sender), args);
    }

    private CommandRouter<ICommandSender> router(QueQiaoRuntime runtime) {
        CommandRouter<ICommandSender> current = cachedRouter;
        if (current != null && cachedRuntime == runtime) {
            return current;
        }

        CommandRouter<ICommandSender> created = runtime.createCommandRouter();
        cachedRuntime = runtime;
        cachedRouter = created;
        return created;
    }
}
```

:::

::: details Brigadier 平台：递归映射命令树

```java
private static LiteralArgumentBuilder<CommandSourceStack> registerCommand(CommandNode<CommandSourceStack> node) {
    LiteralArgumentBuilder<CommandSourceStack> builder = Commands.literal(node.getName());
    if (node.isRoot()) {
        builder.requires(source -> source.hasPermission(CommandConstant.MOD_PERMISSION_LEVEL));
    }
    builder.executes(context -> node.execute(new ForgeCommandContext(context.getSource()), Collections.emptyList()));
    for (CommandNode<CommandSourceStack> child : node.getChildren()) {
        builder.then(registerCommand(child));
    }
    return builder;
}
```

:::
