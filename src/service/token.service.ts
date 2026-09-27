import { JWTPay, TokenPair } from "../models/JWTmodel"
import { addDuration } from "../utils/duration"
import { generateAccessToken, generateRefreshTorenString } from "../utils/jwt"
import { refreshToken } from "./refresh.token"


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




