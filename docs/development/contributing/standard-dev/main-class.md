# QueQiao 主类

## 保存服务端实例

在 `QueQiao.java` 中，定义一个 `minecraftServer` 变量用于存储当前服务端实例。

当我们需要发送消息、获取玩家列表等操作时，需要通过服务端实例来完成这些操作。

```java
public MinecraftServer minecraftServer;
```

- 在服务端启动后对服务端实例进行赋值。

## 监听服务端启动事件

- `forge` 在 `1.16.5` 之后（不包括 `1.16.5`）的版本中。
- 服务端的启动完成的事件均为 `net.minecraftforge.event.server.ServerStartedEvent`。
- 我们需要在该事件中获取当前服务端的实例并对鹊桥执行初始化操作，同时保证多版本兼容性。

```java
    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
    public void onServerStarted(net.minecraftforge.event.server.ServerStartedEvent event) {
    // ELSE
//    public void onServerStarted(net.minecraftforge.fml.event.server.FMLServerStartedEvent event) {
        // END IF
        minecraftServer = event.getServer();
        GlobalContext.init(
            true,                                   // 是否为Mod服务端，这里影响配置文件生成路径
            minecraftServer.getServerVersion(),     // 获取当前服务端版本
            ServerTypeConstant.FORGE,               // 服务端类型常量，来自于鹊桥工具包
            new HandleApiImpl(),                    // API 处理实现类
            new HandleCommandReturnMessageImpl()   // 命令返回消息处理实现类
        );
    }
```

::: warning 注意

- 一定要在服务端启动之后再进行鹊桥的初始化操作，因为只有服务端启动完成后才可以连接 `Rcon`。
:::

## 监听服务端停止事件

- 在服务端停止时对鹊桥进行卸载操作，同时注意保证多版本兼容性。

```java
    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
    public void onServerStopping(net.minecraftforge.event.server.ServerStoppingEvent event) {
    // ELSE
//    public void onServerStopping(net.minecraftforge.fml.event.server.FMLServerStoppingEvent event) {
        // END IF
        GlobalContext.shutdown();
    }
```

## 注册

- 在构造函数中注册事件监听器。

```java
    public QueQiao() {
        // 注册当前类作为事件监听器，以监听服务端启动和停止事件
        MinecraftForge.EVENT_BUS.register(this);
        // 注册自定义事件处理器
        MinecraftForge.EVENT_BUS.register(new EventProcessor());
    }
```

## 完成

- 恭喜你，至此你已经完成了服务端主类的编写。
- 但请不要高兴的太早，请及时按下 `Ctrl+S` 保存代码，以免丢失。哪怕你是在 `IDEA` 中开发，也请养成良好的保存习惯。
- 否则你会在 `IDEA` 与 `ModMultiVersion` 的冲突机制中丢失代码。

## 参考

::: details 点击展开查看

```java
package com.github.theword.queqiao;

import com.github.theword.queqiao.handle.HandleApiImpl;
import com.github.theword.queqiao.handle.HandleCommandReturnMessageImpl;
import com.github.theword.queqiao.tool.GlobalContext;
import com.github.theword.queqiao.tool.constant.BaseConstant;
import com.github.theword.queqiao.tool.constant.ServerTypeConstant;
import net.minecraft.server.MinecraftServer;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;


@Mod(BaseConstant.MOD_ID)
public class QueQiao {
    public static MinecraftServer minecraftServer;

    public QueQiao() {
        MinecraftForge.EVENT_BUS.register(this);
        MinecraftForge.EVENT_BUS.register(new EventProcessor());
    }

    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
    public void onServerStarted(net.minecraftforge.event.server.ServerStartedEvent event) {
    // ELSE
//    public void onServerStarted(net.minecraftforge.fml.event.server.FMLServerStartedEvent event) {
        // END IF
        minecraftServer = event.getServer();
        GlobalContext.init(true, minecraftServer.getServerVersion(), ServerTypeConstant.FORGE, new HandleApiImpl(), new HandleCommandReturnMessageImpl());
    }

    @OnlyIn(Dist.DEDICATED_SERVER)
    @SubscribeEvent
    // IF > forge-1.16.5
    public void onServerStopping(net.minecraftforge.event.server.ServerStoppingEvent event) {
    // ELSE
//    public void onServerStopping(net.minecraftforge.fml.event.server.FMLServerStoppingEvent event) {
        // END IF
        GlobalContext.shutdown();
    }
}
```

:::
