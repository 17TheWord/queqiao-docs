# QueQiao 主类

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。
:::

## 保存服务端实例

在 `QueQiao.java` 中定义一个 `minecraftServer` 变量，用于发送消息、获取玩家列表等操作。

```java
public static MinecraftServer minecraftServer;
```

## 创建运行时

服务端启动完成后，创建平台上下文与运行时：

```java
PlatformContext context = new PlatformContext(minecraftServer);
QueQiaoRuntime created = QueQiaoRuntime.create(context);
context.bindRuntime(created);
created.start();

platformContext = context;
runtime = created;
```

::: warning 注意
一定要在服务端启动完成后再启动运行时：启动过程中 `Rcon` 尚未就绪，过早启动会导致连接失败。
:::

## 关闭运行时

```java
QueQiaoRuntime current = runtime;
if (current != null) {
    current.shutdown();
}
runtime = null;
platformContext = null;
```

## 多版本兼容

不同 Forge 版本的启动/停止事件类不同，使用条件注释处理：

```java
    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
//    public void onServerStarted(net.minecraftforge.event.server.ServerStartedEvent event) {
    // ELSE
//    public void onServerStarted(net.minecraftforge.fml.event.server.FMLServerStartedEvent event) {
        // END IF
```

## 参考

::: details 点击展开查看

```java
package com.github.theword.queqiao;

import io.github.theword.queqiao.core.constant.BaseConstant;
import io.github.theword.queqiao.core.runtime.QueQiaoRuntime;
import net.minecraft.server.MinecraftServer;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;


@Mod(BaseConstant.MOD_ID)
public class QueQiao {
    public static MinecraftServer minecraftServer;

    /**
     * Runtime 在服务端启动后才存在；事件与命令通过供应商延迟取值。
     */
    private static volatile QueQiaoRuntime runtime;

    private static volatile PlatformContext platformContext;

    private final EventProcessor eventProcessor = new EventProcessor(QueQiao::getPlatformContext);

    public QueQiao() {
        MinecraftForge.EVENT_BUS.register(this);
        MinecraftForge.EVENT_BUS.register(eventProcessor);
    }

    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
//    public void onServerStarted(net.minecraftforge.event.server.ServerStartedEvent event) {
    // ELSE
//    public void onServerStarted(net.minecraftforge.fml.event.server.FMLServerStartedEvent event) {
        // END IF
        minecraftServer = event.getServer();

        PlatformContext context = new PlatformContext(minecraftServer);
        QueQiaoRuntime created = QueQiaoRuntime.create(context);
        context.bindRuntime(created);
        created.start();

        platformContext = context;
        runtime = created;
    }

    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
//    public void onServerStopping(net.minecraftforge.event.server.ServerStoppingEvent event) {
    // ELSE
//    public void onServerStopping(net.minecraftforge.fml.event.server.FMLServerStoppingEvent event) {
        // END IF
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
