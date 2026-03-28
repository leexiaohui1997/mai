import { execSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const composeDir = join(projectRoot, 'compose')

try {
  console.log('🚀 启动 Mai Docker 服务...')
  console.log('')

  // 切换到 compose 目录并执行 docker compose up
  execSync('docker compose up -d', {
    cwd: composeDir,
    stdio: 'inherit',
  })

  console.log('')
  console.log('✅ Mai Docker 服务已启动！')
  console.log('')
  console.log('💡 常用命令：')
  console.log('  docker compose logs -f    # 查看日志')
  console.log('  docker compose down       # 停止所有')
  console.log('')
} catch {
  console.error('❌ 启动服务失败，请检查 Docker 是否已安装并运行。')
  process.exit(1)
}
