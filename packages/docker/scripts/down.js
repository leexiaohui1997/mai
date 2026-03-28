import { execSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const composeDir = join(projectRoot, 'compose')

try {
  console.log('🛑 停止 Mai Docker 服务...')
  console.log('')

  // 切换到 compose 目录并执行 docker compose down
  // 传递命令行参数，支持 --volumes, --remove-orphans 等选项
  const args = process.argv.slice(2).join(' ')
  execSync(`docker compose down ${args}`, {
    cwd: composeDir,
    stdio: 'inherit',
  })

  console.log('')
  console.log('✅ Mai Docker 服务已停止。')
  console.log('')
} catch {
  console.error('❌ 停止服务失败，请检查 Docker 是否已安装并运行。')
  process.exit(1)
}
