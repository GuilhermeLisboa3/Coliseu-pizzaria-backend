import './config/module-alias'
import { PgConnection } from '@/infra/database/postgres/helpers'

const pgConnection = new PgConnection()

pgConnection.connect()
  .then(async () => {
    const { app, env: { port } } = await import('@/main/config')

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(async () => { await pgConnection.disconnect() })
