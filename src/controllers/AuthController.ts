import { AuthService } from "../service/AuthService";
import type { Request, Response } from "express";
import { hash_password, compare } from "../utils/password";

export class AuthController{
    constructor(private authService:AuthService){}

    async registerUser (req:Request, res:Response){
        const password_hash = await hash_password(req.body.password)
        const rese = this.authService.registerUser(req.body.username, password_hash)
        if(rese == null){
            return res.status(500).json({result: "ошибка при регистрации"})
        }

        return res.status(200).json({result: "успешная регистрация"})
    }

    async loginUser(req:Request, res:Response){
        const user = req.user;
        const user_1 = await this.authService.findUserByUsername(user?.username as string)


        const password_d = await compare(user?.password as string, user_1.password_hash)
        if(password_d){
            const rese = this.authService.loginUser(user?.username as string, user?.password as string)
            if(rese == null){
                return res.status(500).json({result: "ошибка при входе"})
            }

            return res.status(200).json({result: "успешный вход"})
        }
        return res.status(403).json({result: "неверный логин или пароль"})

        
    }



}