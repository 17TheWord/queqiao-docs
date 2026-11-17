# 游戏命令实现

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。`SubCommand` / `AbstractCommand` / `ReloadCommandAbstract` 等旧命令类已被移除。
:::

Forge 1.18+ 使用 Brigadier。推荐用 `createDeferredCommandTree` 构建完整命令树，再递归映射为 `LiteralArgumentBuilder`：

```java
RootCommand<Object> rootCommand = QueQiaoRuntime.createDeferredCommandTree(LOGGER, QueQiao::getRuntime);
event.getDispatcher().register(registerCommand(rootCommand));
```

- 命令树中的依赖都以 `Supplier` 注入，只有执行时才读取 Runtime，因此在 `RegisterCommandsEvent` 中注册没问题。
- `help`、`reload`、`server`、`client` 等子命令由 core 内置，不需要再手写子命令类。

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.command;

import com.github.theword.queqiao.QueQiao;
import io.github.theword.queqiao.core.command.CommandNode;
import io.github.theword.queqiao.core.command.RootCommand;
import io.github.theword.queqiao.core.constant.BaseConstant;
import io.github.theword.queqiao.core.constant.CommandConstant;
import io.github.theword.queqiao.core.runtime.QueQiaoRuntime;
// IF > forge-1.16.5
//import net.minecraft.commands.CommandSourceStack;
//import net.minecraft.commands.Commands;
// ELSE
//import net.minecraft.command.CommandSource;
//import net.minecraft.command.Commands;
// END IF
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.server.command.ConfigCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;


@Mod.EventBusSubscriber(modid = BaseConstant.MOD_ID)
public class CommandExecutor {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseConstant.MODULE_NAME);

    @SubscribeEvent
    public static void registerCommands(RegisterCommandsEvent event) {
        // 命令在服务端启动阶段注册，此时 Runtime 可能还不存在，因此使用延迟命令树
        RootCommand<Object> rootCommand = QueQiaoRuntime.createDeferredCommandTree(LOGGER, QueQiao::getRuntime);

        event.getDispatcher().register(registerCommand(rootCommand));
        ConfigCommand.register(event.getDispatcher());
    }

    /**
     * 递归将 core 命令节点转换为 Brigadier 的 LiteralArgumentBuilder
     *
     * @param node 当前命令节点
     * @return Brigadier 命令构建器
     */
    // IF > forge-1.16.5
//    private static LiteralArgumentBuilder<CommandSourceStack> registerCommand(CommandNode<Object> node) {
//        LiteralArgumentBuilder<CommandSourceStack> builder = Commands.literal(node.getName());
        // ELSE
//    private static LiteralArgumentBuilder<CommandSource> registerCommand(CommandNode<Object> node) {
//        LiteralArgumentBuilder<CommandSource> builder = Commands.literal(node.getName());
        // END IF
        if (node.isRoot()) {
            builder.requires(commandSource -> commandSource.hasPermission(CommandConstant.MOD_PERMISSION_LEVEL));
        }
        builder.executes(context -> node.execute(new ForgeCommandContext(context.getSource()), Collections.emptyList()));
        for (CommandNode<Object> child : node.getChildren()) {
            builder.then(registerCommand(child));
        }
        return builder;
    }
}
```

:::

::: tip
`ConfigCommand.register(...)` 是 Forge 自身的配置命令注册，与鹊桥命令树无关，保留原有行为即可。
:::
