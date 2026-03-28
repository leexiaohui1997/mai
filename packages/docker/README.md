# Mai Docker

## 🚀 快速开始

### 启动所有服务

```bash
pnpm --filter=@mai/docker up

# 查看日志
docker-compose logs -f
```

### 停止所有服务

```bash
pnpm --filter=@mai/docker down
```

### 清理数据（⚠️ 删除所有数据卷）

```bash
pnpm --filter=@mai/docker clean
```

## 📁 目录结构

```
packages/docker/
├── compose/                    # 总编排配置
│   └── docker-compose.yml      # 组合所有服务
├── services/                   # 所有独立编排服务
│   ├── tidb/                  # TiDB 集群
│   ├── redis/                 # Redis & Redis Commander
│   └── [future-service]/      # 未来的其他服务
├── scripts/                    # 管理脚本
│   ├── up.sh                  # 启动所有
│   └── down.sh                # 停止所有
└── README.md                   # 本文档
```

## 🔗 服务列表

| 服务      | 说明                     | 文档                                                   |
| --------- | ------------------------ | ------------------------------------------------------ |
| **TiDB**  | 分布式数据库（集群模式） | [services/tidb/README.md](./services/tidb/README.md)   |
| **Redis** | 键值存储数据库           | [services/redis/README.md](./services/redis/README.md) |

## ⚠️ 注意事项

1. **数据持久化**: 数据存储在 Docker volumes 中，删除 volume 会丢失数据
2. **网络互通**: 所有服务都在 `mai-network` 网络中
3. **独立启动**: 每个服务可以单独启动，详见各自文档
