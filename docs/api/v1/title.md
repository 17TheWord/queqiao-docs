# Title

API：`send_title`

## 请求参数

| 字段名   | 数据类型                 | 是否必填 | 默认值 | 说明     |
| -------- | ------------------------ | -------- | ------ | -------- |
| title    | string / [message](./model.md#message) | 是      | -      | 标题     |
| subtitle | string / [message](./model.md#message) | 否      | -      | 副标题   |
| fadein   | int                      | 否       | 10     | 淡入时间 |
| stay     | int                      | 否       | 70     | 持续时间 |
| fadeout  | int                      | 否       | 20     | 淡出时间 |

## 响应数据

该接口无返回数据

## 请求示例

### only-Title

```json
{
  "api": "send_title",
  "data": {
    "title": "test",
    "subtitle": ""
  },
  "echo": "1"
}
```

### Title-and-SubTitle

```json
{
  "api": "send_title",
  "data": {
    "title": "title test",
    "subtitle": "subtitle test"
  },
  "echo": "1"
}
```

### All

```json
{
  "api": "send_title",
  "data": {
    "title": [
      {
        "type": "text",
        "data": {
          "text": "Title1",
          "color": "aqua"
        }
      },
      {
        "type": "text",
        "data": {
          "text": " Title2",
          "color": null,
          "font": null,
          "bold": true,
          "italic": true,
          "underlined": false,
          "strikethrough": false,
          "obfuscated": false,
          "insertion": null
        }
      }
    ],
    "subtitle": [
      {
        "type": "text",
        "data": {
          "text": "SubTitle1 ",
          "color": null,
          "font": null,
          "bold": false,
          "italic": false,
          "underlined": true,
          "strikethrough": true,
          "obfuscated": false,
          "insertion": null
        }
      },
      {
        "type": "text",
        "data": {
          "text": "SubTitle2",
          "color": null,
          "font": null,
          "bold": false,
          "italic": false,
          "underlined": false,
          "strikethrough": false,
          "obfuscated": true,
          "insertion": null
        }
      }
    ],
    "fadein": 10,
    "stay": 20,
    "fadeout": 10
  },
  "echo": "1"
}
```
