# 标准开发流程

::: tip 版本提示
本开发文档适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。此前的 `queqiao-tool` 接入方式已不再使用。
:::

该方案适合想要克隆项目源码进行版本新增的用户，需要配置多版本 Mod 开发环境。

::: tip
本教程以 `forge` 为例，其他版本类似。旧版 `queqiao-tool` 与 core 的类对照见 [快速开发流程](../quick-start/README.md#从-queqiao-tool-迁移对照)。
:::

## 初始化

环境列表：

- IDEA
- [ModMultiVersion-0.18.6](https://plugins.jetbrains.com/plugin/24872-modmultiversion/versions/stable/680615) 及以上：推荐 `v0.18.6` 版本，新版 Bug 详见 [Issue](https://github.com/kitUIN/ModMultiVersion/issues/4)
- JDK 21 及以上

## 依赖来源

Core 发布在 Maven Central，直接引入即可：

```gradle
dependencies {
    implementation "io.github.17theword.queqiao:core:0.7.0-beta.4"
}
```

不再需要配置 GitHub Maven Packages、`GH_USERNAME` 或 `PACKAGE_READ_ONLY_TOKEN`。

## 准备

1. 克隆项目源码至本地并通过 IDEA 打开。

    ```bash
    git clone https://github.com/17TheWord/queqiao.git
    ```

2. 运行 `init.ps1` 将各服务端插件/模组代码复制至各个版本模块内

    ```powershell
    ./init.ps1
    ```

3. 在 IDEA 右侧的 Gradle 工具栏中，点击刷新按钮，等待依赖下载完成。
