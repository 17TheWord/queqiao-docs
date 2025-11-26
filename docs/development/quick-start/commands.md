# 命令

此处只举例 `reload` 命令，其他命令请参考源码。

## reload

- 继承 `ReconnectCommandAbstract` 并实现服务端的命令接口
- 在目前示例的 `1.12.2`中，`forge` 的命令需要继承 `BaseCommand` 类而非实现接口，可以查看 [参考](#参考)。
- 在高版本中可以使用如下方案直接实现。`ReloadCommandAbstract` 已经实现了命令的主要逻辑，只需要在 `onCommand` 方法判断权限并中调用 `execute` 方法即可。

```java
public class ReloadCommand extends ReloadCommandAbstract implements ForgeSubCommand {
    @Override
    public int onCommand(CommandContext<net.minecraft.commands.CommandSourceStack> context) {
        if (!GlobalContext.getHandleCommandReturnMessageService().hasPermission(context, getPermissionNode())) return 0;
        execute(context, true);
        return Command.SINGLE_SUCCESS;
    }
}
```

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.command.subCommand.client;

import com.github.theword.queqiao.command.ForgeSubCommand;
import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.command.subCommand.client.ReconnectCommandAbstract;
import net.minecraft.command.ICommandSender;
import net.minecraft.server.MinecraftServer;
import net.minecraft.util.math.BlockPos;

import javax.annotation.Nullable;
import java.util.Collections;
import java.util.List;
import java.util.Objects;


public class ReconnectCommand extends ForgeSubCommand {


    public ReconnectCommand() {
        super(new InnerReconnectCommand());
    }

    public static class InnerReconnectCommand extends ReconnectCommandAbstract{

    }
    @Override
    public int onCommand(ICommandSender sender) {
        return 0;
    }
    @Override
    public List<String> getTabCompletions(MinecraftServer server, ICommandSender sender, String[] args, @Nullable BlockPos targetPos) {
        if(args.length==1) return Collections.singletonList("all");
        return Collections.emptyList();
    }
    @Override
    public void execute(MinecraftServer server, ICommandSender sender, String[] args) {
        if (!GlobalContext.getHandleCommandReturnMessageService().hasPermission(sender, inner.getPermissionNode())) return;
        inner.execute(sender, args.length>0 && Objects.equals(args[0], "all"));
    }
}
```

:::
