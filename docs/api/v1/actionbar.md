# Actionbar

API：`send_actionbar`

## 请求参数

| 字段名   | 数据类型                 | 是否必填 | 默认值 | 说明     |
| -------- | ------------------------ | -------- | ------ | -------- |
| message  | string / [message](./model.md#message) | 是      | -      | 消息     |

## 响应数据

该接口无返回数据

## 请求示例

### normal

```json
{
  "api": "send_actionbar",
  "data": {
    "message": [
      {
        "type": "text",
        "data": {
          "text": "Actionbar1"
        }
      }
    ]
  },
  "echo": "1"
}
```

### All

```json
{
  "api": "send_actionbar",
  "data": {
    "message": [
      {
        "type": "text",
        "data": {
          "text": "Actionbar1",
          "color": "Aqua",
          "font": null,
          "bold": true,
          "italic": false,
          "underlined": false,
          "strikethrough": false,
          "obfuscated": false,
          "insertion": null
        }
      }
    ]
  }
}
```
