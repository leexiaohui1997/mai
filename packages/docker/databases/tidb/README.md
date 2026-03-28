# TiDB 集群开发环境

## 🚀 快速开始

### 启动 TiDB 集群

```bash
cd packages/docker/databases/tidb
docker-compose up -d
```

### 停止 TiDB 集群

```bash
docker-compose down
```

### 查看日志

```bash
docker-compose logs -f
```

## 🔗 连接信息

| 组件               | 端口  | 说明                         |
| ------------------ | ----- | ---------------------------- |
| **TiDB**           | 4000  | MySQL 协议端口（连接数据库） |
| **TiDB Dashboard** | 10080 | 可视化监控面板               |
| **PD**             | 2379  | 集群管理 API                 |
| **TiKV**           | 20160 | 存储节点                     |

## 💡 使用方式

### 1. 通过 MySQL 客户端连接

```bash
mysql -h 127.0.0.1 -P 4000 -u root
```

### 2. 通过 DBeaver 等工具

- Host: `localhost`
- Port: `4000`
- Username: `root`
- Password: (空)

### 3. 访问 TiDB Dashboard

浏览器打开：http://localhost:10080/dashboard

## 📦 组件说明

### PD (Placement Driver)

- 集群管理中枢
- 负责元信息管理、调度等
- 类似"大脑"

### TiKV

- 分布式存储引擎
- 实际存储数据的地方
- 基于 Raft 协议

### TiDB

- SQL 解析和计算层
- 兼容 MySQL 协议
- 无状态设计

## ⚠️ 注意事项

1. **资源占用**：约 2-4GB 内存
2. **启动时间**：首次启动约 1-2 分钟
3. **数据持久化**：数据存储在 Docker volumes 中
4. **单 TiKV 模式**：仅用于开发，生产需 3+ TiKV

## 🔧 常用命令

```bash
# 进入 TiDB 容器
docker exec -it mai-tidb-server bash

# 查看集群状态
curl http://localhost:10080/status

# 重置集群（删除所有数据）
docker-compose down -v
```
