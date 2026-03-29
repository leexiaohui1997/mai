# @mai/db-tidb

TiDB 数据库连接包，基于 Prisma ORM v7。

## 功能

- 🚀 TiDB 数据库连接管理
- 🔌 Prisma Client 封装（使用 MariaDB Adapter）
- ❤️ 健康检查
- 🛑 优雅关闭
- 📦 TypeScript 类型支持

## 安装

```bash
# 在业务包中安装
pnpm add @mai/db-tidb
```

## 配置

### 1. 环境变量

在项目根目录创建 `.env` 文件：

```bash
# TiDB 连接配置
TIDB_URL=mysql://root@localhost:4000/mai_dev
TIDB_HOST=localhost
TIDB_PORT=4000
TIDB_USER=root
TIDB_PASSWORD=
TIDB_DATABASE=mai_dev
```

### 2. Docker 环境（可选）

如果使用 Docker 运行 TiDB：

```bash
cd packages/docker/services/tidb
docker-compose up -d
```

## 使用方式

### 基础查询

```typescript
import { prisma } from '@mai/db-tidb'

// 执行原生 SQL
const result = await prisma.$queryRaw`SELECT 1`
console.log('Connected:', result)

// 使用 Prisma Client API
const users = await prisma.user.findMany()
```

### 事务处理

```typescript
import { prisma } from '@mai/db-tidb'

await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: { email: 'user1@example.com' } })
  await tx.user.create({ data: { email: 'user2@example.com' } })
})
```

### 优雅关闭

```typescript
import { prisma } from '@mai/db-tidb'

// 应用关闭时
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
```

### 健康检查

```typescript
import { prisma } from '@mai/db-tidb'

async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'ok', database: 'connected' }
  } catch (error) {
    return { status: 'error', database: 'disconnected' }
  }
}
```

## Scripts

在 `@mai/db-tidb` 包目录下运行：

```bash
# 开发模式（监听编译）
pnpm dev

# 构建生产版本
pnpm build

# 生成 Prisma Client
pnpm db:generate

# 开发环境迁移
pnpm db:migrate

# 生产环境部署迁移
pnpm db:migrate:deploy

# 打开 Prisma Studio（可视化数据管理）
pnpm db:studio
```

## 项目结构

```
packages/db-tidb/
├── prisma/
│   └── schema.prisma      # 数据模型定义
├── src/
│   ├── client.ts          # Prisma Client 初始化
│   └── index.ts           # 统一导出
├── dist/                   # 编译输出目录
├── package.json
├── prisma.config.ts        # Prisma 配置
└── tsconfig.json           # TypeScript 配置
```

## 技术栈

- **Database**: TiDB (MySQL 兼容)
- **ORM**: Prisma v7
- **Adapter**: @prisma/adapter-mariadb
- **Language**: TypeScript (ESM)
- **Runtime**: Node.js 18+

## 架构说明

### 为什么使用 MariaDB Adapter？

TiDB 使用 MySQL 协议，Prisma v7 官方推荐使用 `@prisma/adapter-mariadb` 来支持自托管的 MySQL/MariaDB/TiDB 数据库。

### 连接管理

本包使用单例模式管理 Prisma Client 实例：

```typescript
// 全局单例
export const prisma = globalForPrisma.prisma ?? new PrismaClient({...})
```

确保在整个应用中只有一个 Prisma Client 实例，避免连接池浪费。

## 最佳实践

### 1. 在业务包中使用

```typescript
// packages/domain-user/src/user.service.ts
import { prisma } from '@mai/db-tidb'

export class UserService {
  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }
}
```

### 2. 定义数据模型

在 `prisma/schema.prisma` 中定义你的模型：

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

然后运行：

```bash
pnpm db:migrate
```

### 3. 类型安全

Prisma 会自动生成 TypeScript 类型：

```typescript
import { prisma, User } from '@mai/db-tidb'

// 完全类型安全
const user: User | null = await prisma.user.findUnique({
  where: { id: '123' },
})
```

## 常见问题

### Q: 为什么不用 MySQL Adapter？

A: Prisma v7 官方没有单独的 `@prisma/adapter-mysql`，而是使用 `@prisma/adapter-mariadb` 来支持所有 MySQL 兼容的数据库（包括 TiDB）。

### Q: 可以连接多个 TiDB 实例吗？

A: 当前设计是单例模式。如果需要多数据库连接，可以修改 `client.ts` 创建多个实例。

### Q: 支持 PlanetScale 吗？

A: 不支持。PlanetScale 需要使用 `@prisma/adapter-planetscale`，这是专门为 Serverless MySQL 设计的。

## 相关文档

- [Prisma 官方文档](https://www.prisma.io/docs)
- [TiDB 文档](https://docs.pingcap.com/tidb/stable)
- [Prisma + MySQL/MariaDB](https://www.prisma.io/docs/orm/core-concepts/supported-databases/mysql)

## License

MIT
