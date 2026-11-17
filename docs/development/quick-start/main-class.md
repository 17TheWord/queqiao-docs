# QueQiao 主类

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。
:::

主类负责保存服务端实例、创建运行时，并在服务端关闭时释放资源。

## 生命周期

1. 保存服务端实例（发送消息、获取玩家列表等都要用到）。
2. **服务端启动完成后**创建 `PlatformContext`，再用 `QueQiaoRuntime.create(context)` 创建运行时并 `start()`。
3. 把运行时回填给 `PlatformContext`，用于读取消息前缀。
4. 服务端关闭时调用 `runtime.shutdown()`。

::: warning 注意
一定要在服务端启动完成后再启动运行时：启动过程中 `Rcon` 尚未就绪，过早启动会导致连接失败。
:::

## 创建运行时

```java
PlatformContext context = new PlatformContext(minecraftServer);
QueQiaoRuntime created = QueQiaoRuntime.create(context);
context.bindRuntime(created);
created.start();

platformContext = context;
runtime = created;
```

事件与命令可能在运行时创建之前就完成注册，因此统一通过 `Supplier` 延迟取值：

```java
MinecraftForge.EVENT_BUS.register(new EventProcessor(QueQiao::getPlatformContext));
event.registerServerCommand(new CommandExecutor());
```

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao;

import com.github.theword.queqiao.command.CommandExecutor;
import io.github.theword.queqiao.core.constant.BaseConstant;
import io.github.theword.queqiao.core.runtime.QueQiaoRuntime;
import net.minecraft.server.MinecraftServer;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.common.event.FMLServerStartedEvent;
import net.minecraftforge.fml.common.event.FMLServerStartingEvent;
import net.minecraftforge.fml.common.event.FMLServerStoppingEvent;


@Mod(modid = BaseConstant.MOD_ID, version = QueQiao.VERSION, name = BaseConstant.MODULE_NAME,
        acceptableRemoteVersions = "*", serverSideOnly = false, clientSideOnly = false)
public class QueQiao {
    public static final String VERSION = Tags.VERSION;
    public static MinecraftServer minecraftServer;

    /**
     * Runtime 在服务端启动后才存在；事件与命令通过供应商延迟取值。
     */
    private static volatile QueQiaoRuntime runtime;

    private static volatile PlatformContext platformContext;

    public QueQiao() {
        MinecraftForge.EVENT_BUS.register(this);
        MinecraftForge.EVENT_BUS.register(new EventProcessor(QueQiao::getPlatformContext));
    }

    @Mod.EventHandler
    public void onServerStarting(FMLServerStartingEvent event) {
        minecraftServer = event.getServer();
        event.registerServerCommand(new CommandExecutor());
    }

    @Mod.EventHandler
    public void onServerStarted(FMLServerStartedEvent event) {
        PlatformContext context = new PlatformContext(minecraftServer);
        QueQiaoRuntime created = QueQiaoRuntime.create(context);
        context.bindRuntime(created);
        created.start();

        platformContext = context;
        runtime = created;
    }

    @Mod.EventHandler
    public void onServerStopping(FMLServerStoppingEvent event) {
        QueQiaoRuntime current = runtime;
        if (current != null) {
            current.shutdown();
        }
        runtime = null;
        platformContext = null;
    }

    public static QueQiaoRuntime getRuntime() {
        return runtime;
    }

    public static PlatformContext getPlatformContext() {
        return platformContext;
    }
}
```

:::
