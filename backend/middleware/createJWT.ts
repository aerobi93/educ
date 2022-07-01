import jwt from "jsonwebtoken";
import config from "../config/authConfig";

const JWTcreation = (iduser : string, roleuser : string) => {
    let jwtc =  jwt.sign(
    {id : iduser, role: roleuser, exp : Math.floor(Date.now() / 1000)  + 3600},
    config, 
    
    )
    return jwtc
} 
export default JWTcreation
