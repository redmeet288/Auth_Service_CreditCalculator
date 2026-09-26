import { json } from 'body-parser'
import Express from 'express'
import Pool from 'pg'
import cookieParser from 'cookie-parser'

import { AuthService } from './service/AuthService'
import { AuthController } from './controllers/AuthController'
import { authMiddleware } from './middleware/middleware'




const app = Express()
app.use(json())
app.use(cookieParser())
const port = process.env.PORT || 5432

const pool = new Pool.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || Number(port),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

const authService = new AuthService(pool)
const authController = new AuthController(authService)




app.get("/health", async (req, res) => {
    return res.status(200).json({ status: "ok" })
})

app.post("/register", authController.registerUser)

app.get("/login", authMiddleware, authController.loginUser)

