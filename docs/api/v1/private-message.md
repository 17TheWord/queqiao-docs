# PrivateMessage

API：`send_private_msg`

## 请求参数

> `uuid` 和 `nickname` 至少填写一个，如果都传递，则优先使用 `uuid`

| 字段名   | 数据类型                 | 是否必填 | 默认值 | 说明     |
| -------- | ------------------------ | -------- | ------ | -------- |
| uuid     | UUID/string              | 否       | -      | 玩家 UUID |
| nickname | string                   | 否       | -      | 玩家昵称 |
| message  | string / [message](./model.md#message) | 是      | -      | 发送的消息 |

## 响应数据

| 字段名   | 数据类型 | 说明 |
| -------- | -------- | ---- |
| player   | BasePlayer | 目标玩家信息（玩家基类，具体类型因服务端而异） |
| message  | string   | 消息内容（成功、失败、未找到玩家、玩家离线等） |

## 请求示例

### only-UUID

```json
{
  "api": "send_private_msg",
  "data": {
    "uuid": "aa96407b-9d4d-44f8-8d79-51d0dcfdedff",
    "nickname": "",
    "message": [
      {
        "type": "text",
        "data": {
          "text": "This is a private message only for you."
        }
      }
    ]
  },
  "echo": "1"
}
```

### only-Nickname

```json
{
  "api": "send_private_msg",
  "data": {
    "uuid": "",
    "nickname": "TestUserName",
    "message": [
      {
        "type": "text",
        "data": {
          "text": "This is a private message only for you."
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
  "api": "send_private_msg",
  "data": {
    "uuid": "aa96407b-9d4d-44f8-8d79-51d0dcfdedff",
    "nickname": "",
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
