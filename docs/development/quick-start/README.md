# 快速开发流程

- 本次案例为现成的 [cleanroom-1.12.2](https://github.com/17TheWord/QueQiao/tree/cleanroom-1.12.2) 分支
- 其他版本可以通过 `IDEA` 的 `Minecraft Development` 插件生成模板

## 配置 GitHub Maven Packages

- 各服务端插件/模组的共用部分已被移至 [鹊桥工具包](https://github.com/17TheWord/QueQiaoTool)，
  并由 GitHub 进行托管。
- 访问 GitHub Maven Packages 需要配置**只读的个人访问令牌**。
- 参考 [GitHub Packages 文档](https://docs.github.com/zh/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry#%E5%90%91-github-packages-%E9%AA%8C%E8%AF%81)。
- 该项目使用的环境变量名：
    - `GH_USERNAME`：GitHub 用户名。
    - `PACKAGE_READ_ONLY_TOKEN`：GitHub 个人访问令牌。
