# Translate

| **字段名** | **数据类型**      | **可能的值** | **说明**               |
| :--------- | :---------------- | :----------- | :--------------------- |
| `key`      | `str`             | -            | 当前组件的翻译键       |
| `args`     | [`Translate[]`](#translate) | -            | 翻译参数数组           |
| `text`     | `str`             | -            | 回退文本或原始消息     |

## 翻译功能

- 该模型自 工具包 (Tool) `v0.6.0` 及 鹊桥 (QueQiao) `v0.4.1` 版本起正式引入。
- 该模型用于代替现有的 [Death](../notice/player-death-event.md#death)、[Achievement](../notice/player-achievement-event.md#achievement) 和 [Display](../notice/player-achievement-event.md#display) 中的文本提供更好的国际化支持。
- 具体使用方法请参考 [翻译功能文档](../../../config/translate.md)。
