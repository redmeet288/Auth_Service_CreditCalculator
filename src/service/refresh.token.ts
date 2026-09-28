import {RefreshTokenRecord} from '../models/JWTmodel.ts'
import {pool} from "../utils/db.ts"


export const refreshToken={
    async create(token:string, userId:number, ex_date:Date):Promise<RefreshTokenRecord>{
        const res = await pool.query(`
            INSERT INTO refresh_tokens(token, user_id, expires_at, revoked)
            VALUES($1, $2, $3, $4, FALSE)
            RETURNING *`,
        [token, userId, ex_date]);
        return res.rows[0]
    }
}