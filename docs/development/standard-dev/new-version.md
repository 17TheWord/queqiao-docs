# 新增版本模块

## 创建目录

在 `forge` 目录下新建 `forge-1.21` 目录，重新执行 `init.ps1` 脚本，将代码复制至新目录。

## 修改依赖版本号

当前 `forge-1.21` 目录下虽存在代码，但并不适用于 `1.21`，修改 `gradle.properties` 以支持 `1.21`：

- 原末尾如下：

    ```properties
    # ELSE IF forge-1.20.1
    #minecraft_version=1.20.1
    #forge_version=47.2.20
    #forge_version_range=[47,)
    #minecraft_version_range=[1.20.1,1.21)
    # END IF
    ```

- 修改为：

    ```properties
    # ELSE IF forge-1.20.1
    #minecraft_version=1.20.1
    #forge_version=47.2.20
    #forge_version_range=[47,)
    #minecraft_version_range=[1.20.1,1.21)
    # ELSE IF forge-1.21
    minecraft_version=1.21
    forge_version=51.0.17
    forge_version_range=[51,)
    minecraft_version_range=[1.21,1.22)
    # END IF
    ```

## 导入 Gradle 项目

- 右键 `forge-1.21` 的 `build.gradle` 文件，并加载为 `Gradle` 项目，等待依赖下载完成。
- 此时 `forge-1.21` 已被识别为 `Gradle` 项目，准备编写代码。
