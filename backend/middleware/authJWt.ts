
import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig";
import {countUser} from "../services/count";

const verifyJWT  = async (token : any, authorize? :string) => {
  console.log(token)
  if (!token) {
    return {
      status: 401,
      message: 'aucun token trouve'
    }
  }
  let decrypt = jwt.verify(token,authConfig)
  if (!decrypt) { 
    return {
      status: 401,
      message: "token non valide"
    }
  }
  let {id, role, exp} : any = decrypt
  if (!id || !role || !exp) { 
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
 else if (Math.floor(Date.now() / 1000)  >= exp ) { 
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
      id
    }
  }
}
export default verifyJWT