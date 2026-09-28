import { compare } from "../utils/password.ts";
import { tokenServise } from "./token.service.ts";
import {pool} from "../utils/db.ts"
export class AuthService{

    async checkUsername (username: string){
        const check = await pool.query(`
            SELECT * FROM users WHERE username = $1`, [username])
        return check.rows.length > 0;
    }


    async registerUser(username:string, password:string){

        if(await this.checkUsername(username) == false){
            return null;
        }
        try{
            const res = await pool.query(`
                INSERT INTO users (username, password)
                VALUES ($1, $2)
                RETURNING *`,
                [username, password])
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
            const re = pool.query(`
                SELECT * FROM user
                WHERE username == $1
                RETURNING *`,
            [username])
            return((await re).rows[0])
        }catch(error){
            return(error)
        }
    }
}