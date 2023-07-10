import express from 'express'
import { setupMiddlewares } from '@/main/config/middleware'
import { setupRoutes } from '@/main/config/routes'
import { setupDocs } from '@/main/config/docs'

const app = express()

setupDocs(app)
setupMiddlewares(app)
setupRoutes(app)

export { app }
