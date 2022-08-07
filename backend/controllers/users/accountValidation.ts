import { PrismaClient } from "@prisma/client";
import JWTcreation from "../../middleware/createJWT";
import verifyJWT from "../../middleware/authJWt";

import { update } from "../../services/user";

const prisma  = new PrismaClient()


export const accountValidationController = async(data : any) =>  {
  const token = data.authorization
  const type = data.typeAsk
  
  let dataToken : any = await verifyJWT(token)
  if (dataToken!.status !== 200) {
    return {
      message : dataToken!.message,
      status : dataToken!.status
    }
  }
  else {
    if(type === "validation") {
      let newData = {
        id : dataToken.id,
        validate : "valid"
      }
      await update(newData)
      try{}
      catch{
        return {
          message : "une erreur innatendu est survenue",
          status : 401
        }
      }
    }

    let token = await JWTcreation(dataToken.id, 60 * 60 * 24, dataToken.role)
    try {
      return {
        status : 200,
        message : 'validation ok',
        token,
        role : dataToken.role
      }
    }
    catch{
      return {
        message : "une erreur innatendu est survenue",
        status : 401
      }
    }
  }
}