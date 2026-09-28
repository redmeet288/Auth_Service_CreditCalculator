import jwt, {SignOptions} from "jsonwebtoken";
import crypto from 'crypto'
import { JWTPay } from "../models/JWTmodel.ts";


export function generateAccessToken(paload: JWTPay){
    const option: SignOptions={
        expiresIn: process.env.JWT_TIME_LIFE as SignOptions['expiresIn']
    }

    return jwt.sign(paload, process.env.JWT_SECRET as string, option)
}

export function verifyAccessToken(token:string):JWTPay{
    // try{
    return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPay
    // }catch(err){
    //     console.log("fd")
    // }
    
}



export function generateRefreshTorenString():string{
    return crypto.randomBytes(48).toString('hex')

}