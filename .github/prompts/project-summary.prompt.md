---
description: "总结 queqiao-docs 文档项目现状、内容结构、构建方式与维护关注点"
name: "queqiao-docs Project Summary"
agent: "agent"
---
# queqiao-docs 项目总结

## 项目定位

`queqiao-docs` 是 QueQiao（鹊桥）生态的独立文档仓库，基于 VuePress 2 构建，面向使用者、接入者和贡献者提供中文文档。

它服务于三个关联项目/方向：

- `QueQiao`：Minecraft 多平台 Mod/Plugin 主项目。
- `QueQiaoTool`：公共 Java 工具库与协议实现。
- 外部应用/机器人生态：通过 WebSocket 接入 QueQiao，实现玩家事件监听、消息广播、Rcon 命令、服务器状态查询等能力。

## 技术栈

- 框架：VuePress 2
- Bundler：Vite
- 语言：Markdown、TypeScript
- 包管理器：pnpm
- Node.js 要求：README 中说明需要 Node.js `20.19+`、`22.12+` 或 `23+`
- 搜索：VuePress DocSearch / Algolia
- 主题：`@vuepress/theme-default`

关键依赖来自 `package.json`：

- `vuepress`
- `vue`
- `@vuepress/bundler-vite`
- `@vuepress/theme-default`
- `@vuepress/plugin-docsearch`
- `sass-embedded`

## 构建与运行

常用命令：

- `pnpm install`：安装依赖。
- `pnpm docs:dev`：启动本地文档开发服务器。
- `pnpm docs:build`：构建生产版本。

构建输出目录：

- `docs/.vuepress/dist`

VuePress 主配置：

- `docs/.vuepress/config.ts`

该配置定义：

- VuePress Vite bundler
- DocSearch 搜索插件
- favicon 与 Algolia 站点校验 meta
- 默认主题
- navbar 与 sidebar
- 站点标题、语言和描述

## 内容结构

文档主体位于 `docs/`。

### 首页与介绍

- `docs/README.md`：VuePress 首页，包含 hero、快速开始入口、项目特性。
- `docs/introduction.md`：项目介绍、主要功能、兼容、社群、感谢、贡献说明。

### 部署文档

目录：`docs/deploy/`

用于说明 QueQiao 的部署方式，并包含 Vanilla 相关部署文档。

### 配置文档

目录：`docs/config/`

覆盖：

- 基础配置说明
- Vanilla 配置
- 翻译功能配置

### 命令文档

- `docs/commands.md`

用于说明 QueQiao 的命令使用方式。

### API 文档

目录：

- `docs/api/v2/`
- `docs/api/v1/`

V2 API 当前包含：

- `broadcast`：广播消息。
- `private-message`：私聊消息。
- `title`：标题与副标题。
- `action-bar`：动画栏。
- `rcon-command`：Rcon 命令。
- `get-status`：服务器状态。

V2 总览说明了 WebSocket JSON 请求结构：

- `api`：接口名称。
- `data`：接口参数。
- `echo`：可选回声字段，响应会回传相同值。

### 事件文档

目录：

- `docs/events/v2/`
- `docs/events/v1/`

V2 事件包括：

- 消息事件：
  - `PlayerChatEvent`
  - `PlayerCommandEvent`
- 通知事件：
  - `PlayerJoinEvent`
  - `PlayerQuitEvent`
  - `PlayerDeathEvent`
  - `PlayerAchievementEvent`
- 模型：
  - `Player`
  - `Translate`

事件文档明确说明：

- 事件通过 WebSocket 以 JSON 形式分发。
- 各服务端、各版本之间字段可能存在差异。
- 部分字段在特定平台可能为空。

### 开发文档

目录：

- `docs/development/standard-dev/`
- `docs/development/quick-start/`

`standard-dev` 面向克隆源码、使用多版本 Mod 开发环境、通过 ModMultiVersion 工具新增版本的贡献者。

`quick-start` 面向基于现成分支或模板进行快速开发的用户。

开发文档已覆盖：

- 初始化
- GitHub Maven Packages 配置
- 新增版本模块
- 主类
- 事件监听器
- API 处理实现
- 命令返回信息实现
- 命令
- 工具包说明

### 对接文档

目录：`docs/integration/`

用于说明外部应用如何连接 QueQiao，并指导接入 WebSocket。

### FAQ

- `docs/faq.md`

用于记录常见问题。

## 导航结构

导航配置：

- `docs/.vuepress/config/navbar.ts`
- `docs/.vuepress/config/sidebar/index.ts`

Navbar 当前包含：

- 首页
- 介绍
- 部署
- 配置文件
- 命令
- 事件
- API
- 常见问题
- 开发
- 对接

Sidebar 按功能分模块维护：

- `sidebar/api/v2.ts`
- `sidebar/api/v1.ts`
- `sidebar/events/v2.ts`
- `sidebar/events/v1.ts`
- `sidebar/deploy.ts`
- `sidebar/config.ts`
- `sidebar/development/standard-dev.ts`
- `sidebar/development/quick-start.ts`
- `sidebar/integration.ts`

## 与 QueQiao / QueQiaoTool 的关系

`queqiao-docs` 是协议和使用方式的对外表达层。

与代码仓库的对应关系：

- `QueQiaoTool` 中的 payload、response、event、config、command、Rcon、WebSocket 逻辑，应在文档中体现为 API、事件、配置、命令说明。
- `QueQiao` 中的平台支持、部署方式、多版本开发方式，应在文档中体现为部署、开发、兼容性说明。
- 当 `QueQiaoTool` 新增 API 或事件字段时，需要同步更新 `docs/api/v2/` 与 `docs/events/v2/`。
- 当 `QueQiao` 新增平台或版本时，需要同步更新部署、开发和兼容信息。

## 优势

- 文档已经独立成仓库，便于单独部署和维护。
- VuePress 2 结构清晰，navbar / sidebar 模块化程度较好。
- API、事件、配置、部署、开发、对接、FAQ 分区完整。
- 同时保留 V1 与 V2 文档，有利于旧版本用户迁移。
- 开发文档已经覆盖 ModMultiVersion、多版本开发、GitHub Packages 凭证等关键贡献流程。
- V2 `get_status` 等新能力已有较详细示例，包含请求和响应结构。

## 风险与维护关注点

- `package.json` 中 license 为 `ISC`，但 README 写明项目采用 MIT，需要统一。
- `package.json` 的 `description`、`keywords`、`author` 为空，不利于项目元信息维护。
- README 在线阅读地址为 `queqiao-docs.netlify.app`，主项目 README 使用 `queqiao-docs.pages.dev`，建议确认并统一主站地址。
- API / 事件文档需要与 `QueQiaoTool` 源码保持同步，尤其是新增字段、版本支持和错误响应。
- V1 / V2 并存时，需要明确迁移提示，避免新用户误用旧协议。
- 搜索配置中包含固定 DocSearch appId / apiKey / index，后续迁移域名或站点时需要同步更新。

## 后续维护建议

- 建立“代码变更到文档变更”的同步清单：新增 API、事件、配置、命令时必须更新对应文档。
- 为每个 V2 API 补齐统一格式：接口名、版本支持、请求字段、请求示例、成功响应、失败响应、注意事项。
- 为每个 V2 事件补齐统一格式：事件名、触发条件、字段表、平台差异、示例 JSON。
- 将 V1 文档标记为旧协议，并在入口页提示优先使用 V2。
- 统一项目元信息：README license、`package.json` license、站点地址、仓库链接。
- 可考虑增加 Markdown lint / VuePress build 检查到 CI，防止链接或语法损坏。
