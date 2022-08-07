import jwt, { Secret } from "jsonwebtoken";
import { IJWT } from "../interfaceTS";

const JWTcreation = (iduser : string, delay : number, roleuser? : string,) => {
    const secret: Secret = process.env.SECRET!
    let data :  IJWT = {
      id : iduser,
      exp : Math.floor(Date.now() / 1000)  + delay
    }
    if(roleuser) {
      data = {
        ...data, 
        role : roleuser
      }
    }
    let jwtc =  jwt.sign(
      data,
      secret, 
    )
    return jwtc
} 
export default JWTcreation
