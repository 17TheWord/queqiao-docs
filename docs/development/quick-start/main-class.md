# QueQiao 主类

在 QueQiao 中，需要在主类进行初始化。

- 获取服务端实例，用于广播消息等操作。
- 在服务端启动完成后初始化鹊桥。如果在服务端启动过程中初始化，此时 `Rcon` 暂未启动，连接失败。
- 在服务端关闭时关闭鹊桥。

## 参考示例

::: details 点击展开

```java
package com.github.theword.queqiao;

import com.github.theword.queqiao.command.CommandTreeQueQiao;
import com.github.theword.queqiao.handle.HandleApiImpl;
import com.github.theword.queqiao.handle.HandleCommandReturnMessageImpl;
import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.constant.BaseConstant;
import com.github.theword.queqiao.tool.constant.ServerTypeConstant;
import net.minecraft.server.MinecraftServer;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.common.event.FMLServerStartedEvent;
import net.minecraftforge.fml.common.event.FMLServerStartingEvent;
import net.minecraftforge.fml.common.event.FMLServerStoppingEvent;


@Mod(modid = BaseConstant.MOD_ID, version = QueQiao.VERSION, name = BaseConstant.MODULE_NAME, acceptableRemoteVersions = "*", serverSideOnly = false, clientSideOnly = false)
public class QueQiao {
    public static final String VERSION = "@VERSION@";
    public static MinecraftServer minecraftServer;

    public QueQiao() {
        MinecraftForge.EVENT_BUS.register(this);
        MinecraftForge.EVENT_BUS.register(new EventProcessor());
    }

    @Mod.EventHandler
    public void onServerStarting(FMLServerStartingEvent event) {
        minecraftServer = event.getServer();

        CommandTreeQueQiao command = new CommandTreeQueQiao();
        event.registerServerCommand(command);
    }


    @Mod.EventHandler
    public void onServerStarted(FMLServerStartedEvent event) {
        GlobalContext.init(true, minecraftServer.getMinecraftVersion(), ServerTypeConstant.FORGE, new HandleApiImpl(), new HandleCommandReturnMessageImpl());
    }

    @Mod.EventHandler
    public void onServerStopping(FMLServerStoppingEvent event) {
        GlobalContext.shutdown();
    }

}
```

:::
