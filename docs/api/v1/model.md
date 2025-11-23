# V1 API 常用对象

## message

| **字段名** | **数据类型**                                                                                     | **是否必填** | **默认值** | **说明**                                  |
| ---------- | ------------------------------------------------------------------------------------------------ | ------------ | ---------- | ----------------------------------------- |
| `type`     | string                                                                                           | 是           | `text`     | 一般为 `text` 在 Minecraft 中没有其他用法 |
| `data`     | [CommonTextComponent](#commontextcomponent) / array<[CommonBaseComponent](#commonbasecomponent)> | 是           | -          | 统一解析的消息内容                        |

## CommonTextComponent

| **字段名**      | **数据类型**              | **是否必填** | **默认值** | **说明**       |
| --------------- | ------------------------- | ------------ | ---------- | -------------- |
| `text`          | string                    | 是           | -          | 文本内容       |
| `color`         | string                    | 否           | `white`    | 文本颜色       |
| `font`          | string                    | 否           | `null`     | 文本字体       |
| `bold`          | boolean                   | 否           | `false`    | 是否粗体       |
| `italic`        | boolean                   | 否           | `false`    | 是否斜体       |
| `underlined`    | boolean                   | 否           | `false`    | 是否下划线     |
| `strikethrough` | boolean                   | 否           | `false`    | 是否删除线     |
| `obfuscated`    | boolean                   | 否           | `false`    | 是否混淆       |
| `insertion`     | string                    | 否           | `null`     | 点击后插入文本 |
| `click_event`   | [ClickEvent](#clickevent) | 否           | `null`     | 点击事件       |
| `hover_event`   | [HoverEvent](#hoverevent) | 否           | `null`     | 鼠标悬浮事件   |

## ClickAction

| **键**              | **值**            | **说明**     |
| ------------------- | ----------------- | ------------ |
| `OPEN_URL`          | open_url          | 打开链接     |
| `OPEN_FILE`         | open_file         | 打开文件     |
| `RUN_COMMAND`       | run_command       | 运行命令     |
| `SUGGEST_COMMAND`   | suggest_command   | 提示命令     |
| `CHANGE_PAGE`       | change_page       | 翻页         |
| `COPY_TO_CLIPBOARD` | copy_to_clipboard | 复制到剪贴板 |

## ClickEvent

| **Key**  | **Value**                   | **说明** |
| -------- | --------------------------- | -------- |
| `action` | [ClickAction](#clickaction) | 点击行为 |
| `value`  | string                      | 执行的值 |

## HoverAction

| **键**        | **值**      | **说明** |
| ------------- | ----------- | -------- |
| `SHOW_TEXT`   | show_text   | 显示文本 |
| `SHOW_ITEM`   | show_item   | 显示物品 |
| `SHOW_ENTITY` | show_entity | 显示实体 |

## HoverItem

| **字段名** | **数据类型** | **是否必填** | **默认值** | **说明**                        |
| ---------- | ------------ | ------------ | ---------- | ------------------------------- |
| `id`       | string       | 否           | -          | 物品 ID `Spigot, Forge, Fabric` |
| `count`    | int          | 否           | -          | 数量 `Spigot, Forge, Fabric`    |
| `tag`      | string       | 否           | -          | 物品 tag `Spigot`               |
| `key`      | string       | 否           | -          | 物品 key `Velocity`             |

## HoverEntity

| **字段名** | **数据类型**                                       | **是否必填** | **默认值** | **说明**                               |
| ---------- | -------------------------------------------------- | ------------ | ---------- | -------------------------------------- |
| `id`       | string                                             | 否           | -          | 显示的实体 ID `Spigot`                 |
| `type`     | string                                             | 否           | -          | 显示的实体类型 `Spigot, Forge, Fabric` |
| `name`     | array<[CommonBaseComponent](#commonbasecomponent)> | 否           | -          | 显示的实体名称 `Spigot, Forge, Fabric` |
| `key`      | string                                             | 否           | -          | 显示的实体 key `Velocity`              |

## HoverEvent

| **Key**  | **Value**                                          |
| -------- | -------------------------------------------------- |
| `action` | [`HoverAction`](#hoveraction)                      |
| `text`   | array<[CommonBaseComponent](#commonbasecomponent)> |
| `item`   | [`HoverItem`](#hoveritem)                          |
| `entity` | string                                             |

## CommonBaseComponent

| **字段名**      | **数据类型** | **是否必填** | **默认值** | **说明**       |
| --------------- | ------------ | ------------ | ---------- | -------------- |
| `text`          | string       | 是           | -          | 文本内容       |
| `color`         | string       | 否           | `white`    | 文本颜色       |
| `font`          | string       | 否           | `null`     | 文本字体       |
| `bold`          | boolean      | 否           | `false`    | 是否粗体       |
| `italic`        | boolean      | 否           | `false`    | 是否斜体       |
| `underlined`    | boolean      | 否           | `false`    | 是否下划线     |
| `strikethrough` | boolean      | 否           | `false`    | 是否删除线     |
| `obfuscated`    | boolean      | 否           | `false`    | 是否混淆       |
| `insertion`     | string       | 否           | `null`     | 点击后插入文本 |
