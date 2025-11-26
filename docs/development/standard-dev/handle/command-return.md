# 命令返回信息

- 本章节介绍如何实现命令返回信息处理器。
- 在鹊桥中，为了减少重复代码，将命令返回信息的处理逻辑抽象为 `HandleCommandReturnMessageService` 抽象类。
- 开发者可以通过继承该类并实现其中的方法，来减少每次命令开发时对返回信息处理的重复编写。

## 继承 HandleCommandReturnMessageService 抽象类

要实现命令返回信息处理器，首先需要创建一个新的类，并继承 `HandleCommandReturnMessageService` 抽象类。然后，需要实现其中的两个抽象方法：`handleCommandReturnMessage` 和 `hasPermission`。

### handleCommandReturnMessage 方法

该方法用于处理命令执行后的返回信息，将消息发送给命令执行者。

**方法签名：**

```java
public void handleCommandReturnMessage(Object object, String message)
```

**参数说明：**

- `object`：命令上下文对象，通常是 `CommandContext` 类型
- `message`：需要返回给命令执行者的消息内容

**实现要点：**

1. 将 `object` 参数转换为对应版本的 `CommandContext` 类型
2. 根据不同的 Minecraft 版本，使用相应的 API 发送消息
3. 使用条件编译注释（`IF`/`ELSE IF`/`END IF`）处理不同版本的兼容性

### hasPermission 方法

该方法用于检查命令执行者是否具有执行特定命令的权限。

**方法签名：**

```java
public boolean hasPermission(Object object, String node)
```

**参数说明：**

- `object`：命令上下文对象
- `node`：权限节点（在 Mod 端中未使用，但保留接口统一性）

**返回值：**

- `true`：有权限执行命令
- `false`：无权限执行命令

**实现要点：**

1. 在 Mod 端中，通常使用权限等级（Permission Level）进行判断
2. 鹊桥默认要求权限等级为 2（由 `BaseConstant.MOD_PERMISSION_LEVEL` 定义）
3. 如果权限不足，应调用 `handleCommandReturnMessage` 方法提示用户

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.handle;

import com.github.theword.queqiao.tool.constant.BaseConstant;
import com.github.theword.queqiao.tool.handle.HandleCommandReturnMessageService;
import com.mojang.brigadier.context.CommandContext;
// IF >= forge-1.21
import net.minecraft.network.chat.contents.PlainTextContents.LiteralContents;
// ELSE IF >= forge-1.19
//import net.minecraft.network.chat.contents.LiteralContents;
// END IF
// IF >= forge-1.18
// END IF

public class HandleCommandReturnMessageImpl extends HandleCommandReturnMessageService {

    @Override
    @SuppressWarnings("unchecked")
    public void handleCommandReturnMessage(Object object, String message) {
        // IF > forge-1.16.5
        CommandContext<net.minecraft.commands.CommandSourceStack> context = (CommandContext<net.minecraft.commands.CommandSourceStack>) object;
        // END IF
        // IF >= forge-1.19
        context.getSource().sendSystemMessage(net.minecraft.network.chat.MutableComponent.create(new LiteralContents(message)));
        // ELSE IF >= forge-1.18
//            context.getSource().sendSuccess(new net.minecraft.network.chat.TextComponent(message), false);
        // ELSE
//        CommandContext<net.minecraft.command.CommandSource> context = (CommandContext<net.minecraft.command.CommandSource>) object;
//            context.getSource().sendSuccess(new net.minecraft.util.text.StringTextComponent(message), false);
        // END IF
    }

    /**
     * 判断发送者是否有权执行命令
     * <p>MOD端中无权限节点，权限等级为2</p>
     *
     * @param object 命令返回者
     * @param node   权限节点
     * @return boolean 是否有权限
     */
    @Override
    @SuppressWarnings("unchecked")
    public boolean hasPermission(Object object, String node) {
        // IF > forge-1.16.5
        CommandContext<net.minecraft.commands.CommandSourceStack> context = (CommandContext<net.minecraft.commands.CommandSourceStack>) object;
        // ELSE
//        CommandContext<net.minecraft.command.CommandSource> context = (CommandContext<net.minecraft.command.CommandSource>) object;
        // END IF
        if (context.getSource().hasPermission(BaseConstant.MOD_PERMISSION_LEVEL)) return true;
        handleCommandReturnMessage(object, "您没有权限执行此命令");
        return false;
    }
}
```

:::
