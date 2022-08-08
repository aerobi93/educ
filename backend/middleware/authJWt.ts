
import jwt, { Secret } from "jsonwebtoken";

const verifyJWT  = async (token : any, role? :string) => {
  const secret: Secret = process.env.SECRET!
  if (!token) {
    return {
      status: 401,
      message: 'aucun token trouve'
    }
  }
  let decrypt = await jwt.verify(token,secret, function(err : any, decoded : any){
    if(err) {
      if (err.expiredAt) {
        return {
          status : 401,
          message : "token expiré",
        }
      }
      else  {
        return {
          status : 401,
          message : "erreur de token",
        }
      }
    }
    if (decoded) {
      if (role) {
        if(role === decoded.role) {
          return {
            status : 200,
            id : decoded.id, 
            role : decoded.role
          }
        }
        else return {
          status : 401,
          message : 'role limité'
        }
      }
      else return { 
        status : 200,
        id : decoded.id, 
        role : decoded.role
      }
    }
  })
  return decrypt
}
export default verifyJWT