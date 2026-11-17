# 初始化

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。
:::

## 配置依赖版本

在 `gradle.properties` 中配置依赖版本与其他信息：

```properties
# Mod Properties
mod_id=queqiao
mod_name=QueQiao
mod_license=MIT
mod_group_id=com.github.theword.queqiao
mod_authors=17TheWord
mod_description=A server plugin/mod that distributes Minecraft server player events in JSON format via Websocket.
# JDK Version
java_version=17
# Lib Properties
glavo_rcon_version=3.0
snakeyaml_version=2.2
java_websocket_version=1.5.3
slf4j_version=1.7.36
```

## 配置依赖

Core 发布在 Maven Central，直接引入即可，不需要额外的私有仓库和访问令牌：

```gradle
repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation "io.github.17theword.queqiao:core:0.7.0-beta.4"

    implementation "org.java-websocket:Java-WebSocket:${java_websocket_version}"
    implementation "org.yaml:snakeyaml:${snakeyaml_version}"
    implementation "org.slf4j:slf4j-api:${slf4j_version}"
    implementation "org.glavo:rcon-java:${glavo_rcon_version}"
}
```

::: tip
如果需要把依赖打包进最终产物（`shadowJar` / `jarJar` / Loom 的 `include`），记得把 Core 与上述基础库一起包含。
:::

## 数据目录

Core 默认根据平台类型选择数据目录：

- 模组端（`forge` / `fabric` / `neoforge`）：`config/queqiao`
- 插件端（`spigot` / `paper` / `velocity` 等）：`plugins/queqiao`

`config.yml` 与 `translate/` 都位于该目录下。需要自定义时覆盖 `PlatformContext#getDataDirectory()`。
