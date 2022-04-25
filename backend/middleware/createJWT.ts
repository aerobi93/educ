import jwt from "jsonwebtoken";
import config from "../config/authConfig";

const JWTcreation = (iduser : string, roleuser : string) => {
    let jwtc =  jwt.sign(
    {id : iduser, role: roleuser},
    config, 
    {expiresIn : Math.floor(Date.now() / 1000)  + 3600}, 
    )
    return jwtc
} 
export default JWTcreation
