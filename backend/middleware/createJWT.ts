import jwt, { Secret } from "jsonwebtoken";


const JWTcreation = (iduser : string, roleuser : string) => {
    const secret: Secret = process.env.SECRET!
    let jwtc =  jwt.sign(
    {id : iduser, role: roleuser, exp : Math.floor(Date.now() / 1000)  + 3600},
    secret, 
    
    )
    return jwtc
} 
export default JWTcreation
