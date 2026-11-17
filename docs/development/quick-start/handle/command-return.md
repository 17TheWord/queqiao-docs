# 命令执行上下文

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。旧版的 `HandleCommandReturnMessageService` 已被移除。
:::

命令执行上下文用于把“命令回执”和“权限判断”从 core 解耦到平台侧。

## CommandExecutionContext

继承 `CommandExecutionContext<NCS>`，实现两个方法：

| 方法 | 说明 |
| --- | --- |
| `reply(String message)` | 把文本回执发送给命令发送者 |
| `hasPermission(String permission)` | 判断发送者是否有权限 |

- `NCS` 是平台命令源类型（如 Bukkit `CommandSender`、Forge `ICommandSender`、Velocity `CommandSource`）。
- `nativeSource` 可以通过父类直接访问。

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.command;

import io.github.theword.queqiao.core.command.CommandExecutionContext;
import io.github.theword.queqiao.core.constant.BaseConstant;
import io.github.theword.queqiao.core.constant.CommandConstant;
import net.minecraft.command.ICommandSender;
import net.minecraft.util.text.TextComponentString;

/**
 * 一次命令调用的执行上下文（Forge 1.12.2 版）。
 */
public final class ForgeCommandContext extends CommandExecutionContext<ICommandSender> {

    public ForgeCommandContext(ICommandSender nativeSource) {
        super(nativeSource);
    }

    @Override
    public void reply(String message) {
        nativeSource.sendMessage(new TextComponentString(message));
    }

    @Override
    public boolean hasPermission(String permission) {
        // MOD 端无权限节点，统一按权限等级判定
        return nativeSource.canUseCommand(CommandConstant.MOD_PERMISSION_LEVEL, BaseConstant.COMMAND_HEADER);
    }
}
```

:::

## 使用方式

命令执行时把它传给 `CommandRouter`，详见 [命令](../commands.md)：

```java
router.execute(new ForgeCommandContext(sender), args);
```

::: tip
命令执行上下文只在命令真正执行时创建，因此可以安全地读取运行时状态。
:::
