import { json } from 'body-parser'
import Express from 'express'
import cookieParser from 'cookie-parser'

import { AuthService } from './service/AuthService.ts'
import { AuthController } from './controllers/AuthController.ts'
import { authMiddleware } from './middleware/middleware.ts'




const app = Express()
app.use(json())
app.use(cookieParser())


const authService = new AuthService()
const authController = new AuthController(authService)




app.get("/health", async (req, res) => {
    return res.status(200).json({ status: "ok" })
})

app.post("/register", authController.registerUser.bind(authController))

app.post("/login", authController.loginUser.bind(authController))



app.listen(3000, () =>{
    console.log("Server running on 3000 port")
})