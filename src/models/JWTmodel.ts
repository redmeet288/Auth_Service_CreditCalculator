export interface JWTPay{
    id:number
    username:string
    password_hash:string
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RefreshTokenRecord {
  id: number;
  token: string;
  user_id: number;
  expires_at: Date;
  revoked: boolean;
}