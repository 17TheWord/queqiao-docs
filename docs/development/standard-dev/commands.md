# 游戏命令实现

本文档介绍如何在 QueQiao 中实现游戏命令的处理逻辑。

## 命令注册

::: details 点击展开

```java
package com.github.theword.queqiao.command;

import com.github.theword.queqiao.command.subCommand.HelpCommand;
import com.github.theword.queqiao.command.subCommand.ReloadCommand;
import com.github.theword.queqiao.command.subCommand.client.ReconnectAllCommand;
import com.github.theword.queqiao.command.subCommand.client.ReconnectCommand;
import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.constant.BaseConstant;
import com.mojang.brigadier.Command;
// IF > forge-1.16.5
import net.minecraft.commands.Commands;
// ELSE
//import net.minecraft.command.Commands;
// END IF
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.server.command.ConfigCommand;


@Mod.EventBusSubscriber(modid = BaseConstant.MOD_ID)
public class CommandExecutor {

    @SubscribeEvent
    public static void registerCommands(RegisterCommandsEvent event) {
        event.getDispatcher().register(
                Commands.literal(BaseConstant.COMMAND_HEADER)
                        .requires(source -> source.hasPermission(2))
                        .executes(context -> new HelpCommand().onCommand(context))
                        .then(Commands.literal("help")
                                .executes(context -> new HelpCommand().onCommand(context))
                        )
                        .then(Commands.literal("reload")
                                .executes(context -> new ReloadCommand().onCommand(context))
                        )
                        .then(Commands.literal("client")
                                .then(Commands.literal("reconnect")
                                        .executes(context -> new ReconnectCommand().onCommand(context))
                                        .then(Commands.literal("all")
                                                .executes(context -> new ReconnectAllCommand().onCommand(context)))
                                )
                        ).then(Commands.literal("server")
                                .executes(context -> {
                                    // TODO Websocket Server Command
                                    GlobalContext.getHandleCommandReturnMessageService().handleCommandReturnMessage(context, "Server command is not supported");
                                    return Command.SINGLE_SUCCESS;
                                })
                        )
        );
        ConfigCommand.register(event.getDispatcher());
    }
}
```

:::

## 重载命令

- 重载命令用于在游戏内热重载鹊桥的配置文件。
- 期间会断开所有 `websocket` 连接、`Rcon` 连接，并重新加载配置文件，然后重新建立连接。
- 最小实现如下

```java
public class ReloadCommand extends ReloadCommandAbstract {

    @Override
    public int onCommand(CommandContext<net.minecraft.commands.CommandSourceStack> context) {
        // 检查权限
        if (!GlobalContext.getHandleCommandReturnMessageService().hasPermission(context, getPermissionNode())) return 0;
        // 执行重载逻辑
        execute(context, true);
        // 返回命令执行结果为成功
        return Command.SINGLE_SUCCESS;
    }
}
```

- 仅需要处理接收命令的部分即可。`ReloadCommandAbstract` 中已包含大部分所需要的逻辑，
  - 权限检查
  - 执行重载逻辑
  - 返回命令执行结果

## 其他命令

- 其他命令的实现与重载命令类似，只需要继承 `Command` 抽象类，并实现 `onCommand` 方法。
- 此处不再赘述，可以参考其他版本实现。
