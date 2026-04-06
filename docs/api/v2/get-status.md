# 🛰️ WebSocket 接口文档

## 📡 接口名称

**状态接口（`get_status`）**

---

## 🧱 数据结构

### 🔹 消息格式

```json
{
  "api": "get_status",
  "echo": "1"
}
```

### 🔹 返回信息

- 正常返回

::: tip

- `favicon` 字段为服务器图标，格式为 `data:image/png;base64,...` 的 Base64 编码字符串，仅当设置了服务器图标时才会返回。

:::

```json
{
  "api": "get_status",
  "code": 200,
  "post_type": "response",
  "status": "SUCCESS",
  "message": "success",
  "data": {
    "timestamp": 1775444822691,
    "server_type": "forge",
    "server_version": "1.21",
    "server_list_ping": {
      "available": true,
      "host": "127.0.0.1",
      "port": 25565,
      "reason": "ok",
      "error": null,
      "version": {
        "name": "1.21",
        "protocol": 767.0
      },
      "players": {
        "max": 20.0,
        "online": 0.0
      },
      "description": "A Minecraft Server",
      "favicon": "data:image/png;base64,...",
      "enforcesSecureChat": true
      // 非原版服务端补充字段，暂未测试完全
      // ...
    },
    "cpu_information": {
      "cpu_cores": 16,
      "load_average": -1.0,
      "system_load": 0.0,
      "process_load": -1.0
    },
    "memory_information": {
      "physical_memory": {
        "total": 34278875136,
        "free": 14827216896,
        "used": 19451658240,
        "percentage": 56.75
      },
      "jvm_memory": {
        "total": 486539264,
        "free": 95978912,
        "max": 8573157376,
        "used": 390560352,
        "percentage": 4.56
      }
    }
  },
  "echo": "1"
}
```

### 补充字段

- forge 1.21

  ```json
  {
    // ...
    "server_list_ping": {
      "available": true,
      "host": "127.0.0.1",
      "port": 25565,
      "reason": "ok",
      "error": null,
      "enforcesSecureChat": true,
      "forgeData": {
        "channels": [],
        "mods": [],
        "truncated": false,
        "fmlNetworkVersion": 0.0,
        "d": "..."
      },
      "description": "A Minecraft Server",
      "players": {
        "max": 20.0,
        "online": 0.0
      },
      "version": {
        "name": "1.21",
        "protocol": 767.0
      }
    }
    // ...
  }
  ```

- 待补充
