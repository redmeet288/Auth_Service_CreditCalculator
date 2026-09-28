import { compare } from "../utils/password.ts";
import { tokenServise } from "./token.service.ts";
import {pool} from "../utils/db.ts"
export class AuthService{

    async checkUsername (username: string){
        const check = await pool.query(`
            SELECT * FROM users WHERE usename = $1`, [username])
        return check.rows.length > 0;
    }


    async registerUser(username:string, password_hash:string){

        if(await this.checkUsername(username) == true){
            return null;
        }
        try{
            const res = await pool.query(`
                INSERT INTO users (usename, password_hash)
                VALUES ($1, $2)
                RETURNING *`,
                [username, password_hash])
            return(res.rows[0])
        }catch(error){
            return(null)
        }
    }

    async loginUser(username:string, password:string){
        const user = await this.findUserByUsername(username)
        if(!user){
            return
            //будет возвращать ошибку
        }

        const isValid = await compare(password, user.password_hash)
        if(!isValid){
            console.log("неверный пароль")
            //будет возвращать ошибку
        }


        return tokenServise.iseeToken({
            id: user.id,
            username: user.username,
            password_hash: user.password
        })




        // выдача токенов


        // try{
        //     const re = await this.pool.query(`
        //         SELECT * FROM users
        //         WHERE username == $1 AND password == $2
        //         RETURNING *`,
        //         [username, password])
        //     return(re.rows[0])

        // }catch(error){
        //     return error
        // }
    }
    async findUserByUsername(username:string){
        try{
            const res = await pool.query(`
                SELECT * FROM users
                WHERE usename = $1
                LIMIT 1`,
            [username])
            return(res.rows[0])
        }catch(error){
            console.error('findUserByUsername error:', error)
            return(null)
        }
    }
}