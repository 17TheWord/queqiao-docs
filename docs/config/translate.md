# 翻译功能

鹊桥支持将游戏内原本以翻译键（Translation Key）形式存在的文本（如成就名称、死亡消息等）转换为可读的本地化文本。

## 支持平台

- `Paper`
- `Fabric`
- `Forge`
- `NeoForge`
- `Folia`

## 启用功能

在配置文件 `config.yml` 中启用翻译功能：

```yaml
enable_translation: true
```

## 使用步骤

1. **创建目录**：
   在配置文件 `config.yml` 同级目录下手动创建一个名为 `translate` 的文件夹。

   - 插件端：`./plugins/QueQiao/translate/`
   - 模组端：`./config/QueQiao/translate/`

2. **添加语言文件**：
   将你需要使用的语言文件（JSON 格式）放入 `translate` 文件夹中。

   例如，你可以从 Minecraft 客户端 jar 包中提取 `zh_cn.json` 或 `en_us.json` 等文件放入。

   文件名支持任意 `.json` 文件，系统会尝试加载该文件夹下所有的 JSON 文件。

## 工作原理

当 `enable_translation` 开启时，插件/模组在处理某些包含翻译组件的事件（如 `PlayerDeathEvent`, `PlayerAdvancementEvent`）时，会尝试查找对应的翻译键。

如果找到对应的键值，它会将消息中的占位符替换为相应的参数，最终输出翻译后的文本给 WebSocket 客户端或其他订阅者。

## 语言文件格式

语言文件通常为标准的 JSON 键值对格式：

```json
{
  "key": "value",
  "advancements.story.root.title": "Minecraft",
  "death.attack.mob": "%1$s 被 %2$s 杀死了"
}
```

## 示例

## 成就翻译

```json
{
    "achievement": {
        "key": "minecraft:story/iron_tools",
        "display": {
            "title": {
                "key": "advancements.story.iron_tools.title",
                "args": [],
                "text": "这不是铁镐么"
            },
            "description": {
                "key": "advancements.story.iron_tools.description",
                "args": [],
                "text": "升级你的镐"
            },
            "frame": "task"
        },
        "translation": {
            "key": "chat.type.advancement.task",
            "args": [
                {
                    "key": null,
                    "args": null,
                    "text": "17TheWord"
                },
                {
                    "key": "chat.square_brackets",
                    "args": [
                        {
                            "key": "advancements.story.iron_tools.title",
                            "args": [],
                            "text": "[这不是铁镐么]"
                        }
                    ],
                    "text": "[这不是铁镐么]"
                }
            ],
            "text": "17TheWord取得了进度[这不是铁镐么]"
        }
    },
    // ...
    "server_type": "forge"
}
```

### 死亡事件示例

```json
{
    "death": {
        "key": "death.attack.genericKill",
        "args": [
            {
                "key": null,
                "args": null,
                "text": "17TheWord"
            }
        ],
        "text": "17TheWord被杀死了"
    },
    // ...
    "server_type": "forge"
}
```

## 注意事项

- 此功能依赖于本地提供的语言文件。如果没有对应的语言文件或键值缺失，系统将无法翻译，或者可能会直接显示原始的翻译键（一般为英文）。
- 对于模组服，你可能需要提取对应模组 jar 包中的语言文件合并或单独放入 `translate` 文件夹。
- 目前采用 `HashMap` 进行存储，建议仅添加各种死法、成就、以及可能击杀玩家的实体、物品等翻译，不要将所有文件都放进来。
