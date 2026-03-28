#!/bin/bash

set -e

echo "🛑 停止 Mai Docker 服务..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_DIR="$(dirname "$SCRIPT_DIR")"

cd "$DOCKER_DIR/compose"

docker-compose down "$@"

echo "✅ Mai Docker 服务已停止。"
