# Redis & Redis Commander

提供 Redis 键值存储服务和图形化管理界面。

## 🚀 快速启动

### 独立运行（推荐先测试）

```bash
cd packages/docker/redis
docker-compose up -d
```

### 联合运行（作为整体编排的一部分）

```bash
cd packages/docker/compose
docker-compose up -d
```

## 📋 服务说明

### Redis

- **镜像**: `redis:7.2-alpine` (轻量级 Alpine 版本)
- **端口**: `6379:6379`
- **数据持久化**: Docker volume `redis_data`
- **健康检查**: 每 10 秒通过 `redis-cli ping` 检查状态
- **重启策略**: 除非手动停止，否则自动重启

### Redis Commander

- **镜像**: `rediscommander/redis-commander:latest`
- **端口**: `8081:8081`
- **访问地址**: http://localhost:8081
- **自动连接**: 已配置自动连接到本地 Redis 实例
- **重启策略**: 除非手动停止，否则自动重启

## 🔗 端口映射

| 服务            | 主机端口 | 容器端口 | 说明           |
| --------------- | -------- | -------- | -------------- |
| Redis           | 6379     | 6379     | Redis 服务端口 |
| Redis Commander | 8081     | 8081     | Web 管理界面   |

## 💾 数据持久化

**数据位置**: Docker managed volume `redis_data`

**查看数据卷**:

```bash
docker volume inspect redis_redis_data
```

**备份数据**:

```bash
docker run --rm -v redis_redis_data:/source -v $(pwd):/backup alpine tar czf /backup/redis-backup.tar.gz -C /source .
```

**恢复数据**:

```bash
docker run --rm -v redis_redis_data:/target -v $(pwd):/backup alpine tar xzf /backup/redis-backup.tar.gz -C /target
```

## 🛠️ 常用命令

### 查看服务状态

```bash
docker-compose ps
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看 Redis 日志
docker-compose logs -f redis

# 查看 Redis Commander 日志
docker-compose logs -f redis-commander
```

### 连接 Redis CLI

```bash
docker exec -it mai-redis redis-cli
```

### 重启服务

```bash
docker-compose restart
```

### 停止服务

```bash
docker-compose down
```

### 清理数据（⚠️ 会删除所有数据）

```bash
docker-compose down -v
```

## 🔧 使用示例

### 在应用中使用 Redis

```javascript
// Node.js 示例
const redis = require('redis')
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
})

client.on('connect', () => {
  console.log('Connected to Redis')
})

// 设置键值对
client.set('key', 'value')

// 获取值
client.get('key', (err, value) => {
  if (err) throw err
  console.log(value) // 输出：value
})
```

### Python 示例

```python
import redis

# 连接 Redis
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# 设置键值对
r.set('key', 'value')

# 获取值
print(r.get('key'))  # 输出：value
```

## ❓ 常见问题

### Q: 无法连接到 Redis？

**A**: 检查容器是否正常运行：

```bash
docker-compose ps
```

### Q: Redis Commander 无法显示 Redis 数据？

**A**: 确保 Redis 容器正在运行，并且 Redis Commander 已通过 `depends_on` 等待 Redis 启动完成。

### Q: 如何重置 Redis 数据？

**A**: 删除数据卷并重新启动：

```bash
docker-compose down -v
docker-compose up -d
```

### Q: 可以在其他容器中访问 Redis 吗？

**A**: 可以，只要其他容器也连接到 `mai-network` 网络，就可以通过 `redis:6379` 访问。

## 🔒 安全提示

- ⚠️ **生产环境**: 当前配置仅适用于开发环境，生产环境需要配置密码认证
- ⚠️ **端口暴露**: 不要将 Redis 端口暴露在公网
- ⚠️ **数据备份**: 定期备份重要数据

## 📚 相关资源

- [Redis 官方文档](https://redis.io/documentation)
- [Redis Commander GitHub](https://github.com/joeferner/redis-commander)
- [Docker Compose 文档](https://docs.docker.com/compose/)
