# Broadcast / Send Message

API：`broadcast` / `send_msg`

## 请求参数

| 字段名   | 数据类型                 | 是否必填 | 默认值 | 说明     |
| -------- | ------------------------ | -------- | ------ | -------- |
| message  | string / [message](./model.md#message) | 是      | -      | 发送的消息 |

## 响应数据

该接口无返回数据

## 请求示例

### Easy

```json
{
  "api": "send_msg",
  "data": {
    "message": "test"
  },
  "echo": "1"
}
```

### Normal

```json
{
  "api": "broadcast",
  "data": {
    "message": [
      {
        "type": "text",
        "data": {
          "text": "test1",
          "color": "aqua"
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
  "api": "broadcast",
  "data": {
    "message": [
      {
        "type": "text",
        "data": {
          "text": "test",
          "color": "aqua",
          "font": null,
          "bold": false,
          "italic": false,
          "underlined": false,
          "strikethrough": false,
          "obfuscated": false,
          "insertion": null,
          "click_event": {
            "action": "open_url",
            "value": "https://www.baidu.com"
          },
          "hover_event": {
            "action": "show_text",
            "text": [
              {
                "text": "test hover",
                "color": "aqua",
                "font": null,
                "bold": true,
                "italic": false,
                "underlined": true,
                "strikethrough": false,
                "obfuscated": false,
                "insertion": null
              }
            ]
          }
        }
      }
    ]
  },
  "echo": "1"
}
```
