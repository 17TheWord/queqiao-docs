# 初始化

## 配置工具包依赖仓库

```gradle
repositories {
    // ...
    maven {
        url = uri(maven_repository_url)
        credentials {
            username = System.getenv("GH_USERNAME")
            password = System.getenv("PACKAGE_READ_ONLY_TOKEN")
        }
    }
}
```

## 配置依赖

在 `gradle.properties` 中配置依赖版本以及其他信息

```properties
# Mod Properties
mod_id=queqiao
mod_name=QueQiao
mod_license=MIT
mod_group_id=com.github.theword.queqiao
mod_authors=17TheWord
mod_description=A server plugin/mod that distributes Minecraft server player events in JSON format via Websocket.
# JDK Version
java_version=21
# Lib Properties
gson_version=2.10.1
glavo_rcon_version=3.0
slf4j_version=1.7.36
lombok_version=1.18.30
snakeyaml_version=2.2
junit_jupiter_version=5.11.4
java_websocket_version=1.5.3
maven_repository_url=https://maven.pkg.github.com/17TheWord/QueQiaoTool
```

在 `build.gradle` 中配置依赖

```gradle
dependencies {
    implementation ("org.java-websocket:Java-WebSocket:${java_websocket_version}")
    implementation ("org.slf4j:slf4j-simple:${slf4j_version}")
    implementation ("org.yaml:snakeyaml:${snakeyaml_version}")
    implementation ("org.glavo:rcon-java:${glavo_rcon_version}")
}
```
