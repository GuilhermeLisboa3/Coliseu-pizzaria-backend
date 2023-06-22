import express from 'express'
import { setupMiddlewares } from '@/main/config/middleware'

const app = express()

setupMiddlewares(app)

export { app }
