import { JWTPay, TokenPair } from "../models/JWTmodel.ts"
import { addDuration } from "../utils/duration.ts"
import { generateAccessToken, generateRefreshTorenString } from "../utils/jwt.ts"
import { refreshToken } from "./refresh.token.ts"


export const tokenServise = {

    async iseeToken(paload: JWTPay):Promise<TokenPair>{
        const acssestoken = generateAccessToken(paload)
        const refToken = generateRefreshTorenString()
        const ex = addDuration(new Date(), process.env.JWT_REFRESH_EXPIRY as string)


        await refreshToken.create(refToken, paload.id, ex)
        return{
            accessToken: acssestoken,
            refreshToken: refToken,
            expiresIn: process.env.JWT_ACCESS_EXPIRY as string
        };

    }

}

 


