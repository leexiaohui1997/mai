#!/bin/bash

set -e

echo "🚀 启动 Mai Docker 服务..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_DIR="$(dirname "$SCRIPT_DIR")"

cd "$DOCKER_DIR/compose"

docker-compose up -d

echo ""
echo "✅ Mai Docker 服务已启动！"
echo ""
echo "💡 常用命令："
echo "  docker-compose logs -f    # 查看日志"
echo "  docker-compose down       # 停止所有"
