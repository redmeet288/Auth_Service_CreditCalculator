import { AuthService } from "../service/AuthService.ts";
import type { Request, Response } from "express";
import { hash_password, compare } from "../utils/password.ts";

export class AuthController{
    constructor(private authService:AuthService){}

    async registerUser (req:Request, res:Response){
        const password_hash = await hash_password(req.body.password)
        const rese = await this.authService.registerUser(req.body.username, password_hash)

        if(rese == null){
            return res.status(500).json({result: "ошибка при регистрации"})
        }

        return res.status(200).json({result: "успешная регистрация"})
    }

    async loginUser(req:Request, res:Response){
        const password = req.body.password;
        const user_1 = await this.authService.findUserByUsername(req.body.username)

        const password_d = await compare(req.body.password, user_1.password_hash)
        if(password_d){
            const rese = await this.authService.loginUser(req.body.username, req.body.password)
            if(rese == null){
                return res.status(500).json({result: "ошибка при входе"})
            }

            return res.status(200).json({result: "успешный вход", data:rese})
        }
        return res.status(403).json({result: "неверный логин или пароль"})

        
    }



}