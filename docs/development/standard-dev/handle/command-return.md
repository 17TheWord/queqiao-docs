# 命令执行上下文

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。旧版的 `HandleCommandReturnMessageService` 已被移除。
:::

`CommandExecutionContext<NCS>` 负责命令的回执与权限判断：

- `reply(String message)`：给命令发送者回执。
- `hasPermission(String permission)`：判断是否有权限。

Forge 各版本的命令源类型不同：

- `1.16.5`：`net.minecraft.command.CommandSource`
- `1.18.2+`：`net.minecraft.commands.CommandSourceStack`

与 `PlatformContext` 类似，这里也统一使用 `Object` 作为命令源类型，在方法内部按版本转型。

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.command;

import io.github.theword.queqiao.core.command.CommandExecutionContext;
import io.github.theword.queqiao.core.constant.CommandConstant;

// IF > forge-1.16.5
//import net.minecraft.commands.CommandSourceStack;
//import net.minecraft.network.chat.Component;
// ELSE
//import net.minecraft.command.CommandSource;
//import net.minecraft.util.text.StringTextComponent;
// END IF

// IF forge-1.18.2
//import net.minecraft.network.chat.TextComponent;
// END IF

public final class ForgeCommandContext extends CommandExecutionContext<Object> {

    public ForgeCommandContext(Object nativeSource) {
        super(nativeSource);
    }

    @Override
    public void reply(String message) {
        // IF >= forge-1.19
//        ((CommandSourceStack) nativeSource).sendSystemMessage(Component.literal(message));
        // ELSE IF >= forge-1.18
//        ((CommandSourceStack) nativeSource).sendSuccess(new TextComponent(message), false);
        // ELSE
//        ((CommandSource) nativeSource).sendSuccess(new StringTextComponent(message), false);
        // END IF
    }

    @Override
    public boolean hasPermission(String permission) {
        // MOD 端无权限节点，统一按权限等级判定
        // IF > forge-1.16.5
//        return ((CommandSourceStack) nativeSource).hasPermission(CommandConstant.MOD_PERMISSION_LEVEL);
        // ELSE
//        return ((CommandSource) nativeSource).hasPermission(CommandConstant.MOD_PERMISSION_LEVEL);
        // END IF
    }
}
```

:::
