# 鹊桥文档

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VuePress](https://img.shields.io/badge/VuePress-2.0-green.svg)](https://v2.vuepress.vuejs.org/)

本仓库是 [鹊桥 (QueQiao)](https://github.com/17TheWord/QueQiao) 项目的文档仓库，基于 [VuePress 2.0](https://vuepress.vuejs.org/zh/) 构建。

## 📖 关于鹊桥

鹊桥是一个适用于多种 Minecraft 服务端的 Mod/Plugin，能够实时分发玩家事件，并通过 WebSocket 与外部系统进行消息互通。

**主要特性：**

- 🎮 **实时玩家事件分发** - 支持玩家加入、离开、聊天、命令、成就、死亡等事件
- 📢 **API 消息广播** - 提供广播、私聊、标题、动画栏等多种消息接口
- 🔌 **多服务端兼容** - Vanilla、Spigot、Paper、Forge、Fabric、NeoForge、Folia、Velocity
- 🔐 **权限与安全** - 支持权限节点供权限插件管理
- 💻 **命令交互** - 通过 Rcon 实现服务端命令交互

## 🚀 快速开始

### 在线阅读

访问文档站点：[https://queqiao-docs.pages.dev/](https://queqiao-docs.pages.dev/)

### 本地运行

1. **克隆仓库**

  ```bash
  git clone https://github.com/17TheWord/queqiao-docs.git
  cd queqiao-docs
  ```

2. **安装依赖**

  > 需要 Node.js 版本 20.19+, 22.12+ 或 23+
  - 本项目使用 pnpm 作为包管理器：

  ```bash
  pnpm install
  ```

3. **启动开发服务器**

  - 文档将在 `http://localhost:8080` 上运行。
  ```bash
  pnpm docs:dev
  ```

4. **构建生产版本**

  ```bash
  pnpm docs:build
  ```

  - 构建后的文件将输出到 `docs/.vuepress/dist` 目录。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 🔗 相关链接

- [鹊桥主项目](https://github.com/17TheWord/QueQiao)
- [Modrinth 下载](https://modrinth.com/plugin/queqiao)
- [CurseForge 下载](https://www.curseforge.com/minecraft/mc-mods/queqiao)
- [Discord 社群](https://discord.gg/SBUkMYsyf2)

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/17TheWord/queqiao-docs/issues)
- 加入 [Discord 社群](https://discord.gg/SBUkMYsyf2)

## 📄 开源协议

本项目采用 [MIT](./LICENSE) 协议开源
