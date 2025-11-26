# 标准开发流程

该方案适合想要克隆项目源码进行版本新增的用户，需要配置多版本 Mod 开发环境。

::: tip
本教程以新增 `forge-1.21` 为例，其他版本类似。
:::

## 初始化

环境列表:

- IDEA
- [ModMultiVersion-0.18.6](https://plugins.jetbrains.com/plugin/24872-modmultiversion/versions/stable/680615) 及以上：推荐 `v0.18.6` 版本，新版 Bug 详见 [Issue](https://github.com/kitUIN/ModMultiVersion/issues/4)
- JDK 21 及以上

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
