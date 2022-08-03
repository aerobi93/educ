
import jwt, { Secret } from "jsonwebtoken";
import {countUser} from "../services/count";

const verifyJWT  = async (token : any, authorize? :string) => {
  const secret: Secret = process.env.SECRET!
  if (!token) {
    return {
      status: 401,
      message: 'aucun token trouve'
    }
  }
  let decrypt = jwt.verify(token,secret)
  if (!decrypt) { 
    return {
      status: 401,
      message: "token non valide"
    }
  }
  let {id, role, iat, exp} : any = decrypt
  if (!id || !role || !iat) { 
    return {
      status: 401,
      message: "token non valide" 
    }
  }
  if(await countUser(id) || await countUser(id)! <= 0) { 
    return {
        status: 401,
        message: "aucun utilisateur trouver"
    }
  } 

 else if (iat > exp ) { 
 
    return {
      status: 401,
      message: "temp du token depassé"
    }
  }
  else if (role !== authorize && authorize) {
    return {
      status: 401,
      message: `necessesite le role de ${authorize} et vous avez celui de ${role}`,
      id
    }
  }
  else if(role === authorize || !authorize) {    
    return {
      status: 200,
      message: 'autoriser',
      id,
      role
    }
  }
}
export default verifyJWT