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

## 配置 GitHub Maven Packages

- 各服务端插件/模组的共用部分已被移至 [鹊桥工具包](https://github.com/17TheWord/QueQiaoTool)，
    并由 GitHub 进行托管。
- 访问 GitHub Maven Packages 需要配置**只读的个人访问令牌**。
- 参考
    [GitHub Packages 文档](https://docs.github.com/zh/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry#%E5%90%91-github-packages-%E9%AA%8C%E8%AF%81)。
- 该项目使用的环境变量名：
  - `GH_USERNAME`：GitHub 用户名。
  - `PACKAGE_READ_ONLY_TOKEN`：GitHub 个人访问令牌。

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
