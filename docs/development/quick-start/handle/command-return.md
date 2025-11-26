# 命令返回消息实现

- 本章节介绍如何实现命令返回信息处理器。
- 在鹊桥中，为了减少重复代码，将命令返回信息的处理逻辑抽象为 `HandleCommandReturnMessageService` 抽象类。
- 开发者可以通过继承该类并实现其中的方法，来减少每次命令开发时对返回信息处理的重复编写。
- 该处理器主要包含两个方法：
  - `handleCommandReturnMessage(Object object, String message)`：用于处理命令返回信息的发送。
  - `hasPermission(Object object, String node)`：用于判断命令发送者是否具有执行命令的权限。
  - 其中，`object` 参数通常是**命令发送者**类型的对象，代表命令的发送者。

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.handle;

import com.github.theword.queqiao.tool.constant.BaseConstant;
import com.github.theword.queqiao.tool.handle.HandleCommandReturnMessageService;
import net.minecraft.command.ICommandSender;
import net.minecraft.util.text.TextComponentString;

public class HandleCommandReturnMessageImpl extends HandleCommandReturnMessageService {

    @Override
    public void handleCommandReturnMessage(Object object, String message) {
        ICommandSender sender = (ICommandSender) object;
        sender.sendMessage(new TextComponentString(message));
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
    public boolean hasPermission(Object object, String node) {
        ICommandSender sender = (ICommandSender) object;
        if (sender.canUseCommand(BaseConstant.MOD_PERMISSION_LEVEL,"")) return true;
        handleCommandReturnMessage(object, "您没有权限执行此命令");
        return false;
    }
}
```

:::
