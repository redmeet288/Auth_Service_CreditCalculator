import bcrypt from 'bcrypt'

const SALT = 10;

export async function hash_password(password:string):Promise<string> {
    return bcrypt.hash(password, SALT)
}


export async function compare(password:string, hash:string) {
    return bcrypt.compare(password,hash)
    
}