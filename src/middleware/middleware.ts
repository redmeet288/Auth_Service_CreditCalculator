import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoder = jwt.verify(token, process.env.JwT_SECRET!) as {
            id: number,
            username:string
            password:string
        };
        req.user = decoder
        next();
    }catch(error){
        return res.status(403).json({result: "нет дотсупа", error: error})
    }


}