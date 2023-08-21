import './config/module-alias'
import { prisma } from '@/infra/database/postgres/helpers'

prisma.$connect()
  .then(async () => {
    const { app, env: { port } } = await import('@/main/config')

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(async () => { await prisma.$disconnect() })
