import { PrismaClient } from "@prisma/client";
import { InewValidationCode } from "../../interfaceTS";
import JWTcreation from "../../middleware/createJWT";
import { accountValidation } from "../../services/accountValidation";
import { update } from "../../services/user";

const prisma  = new PrismaClient()

export const accountValidationController = async(data : InewValidationCode) =>  {

 await accountValidation(data)
  try {
    let {id, role }: any = await accountValidation(data)
    if (!id || !role ) {
      return {
        status : 401,
        message: "une erreur inattendu est survenue"
      }
    }
     let userdata = {
      ...data,
      id,
      validate: "valid"
    }
    if (await update(userdata)) {
      await update(userdata)
      return {
        status: 200,
        message : {
          token : await JWTcreation(id, role),
          message: 'valider',
          role: role
        }
      }
    }
    else if (!await update(userdata)){
      return {
        status : 401,
        message : "une erreur inattendu est survenue"
      }
    }
  }
  catch(e) {
    return{
        status : 401,
        message : "lien non valide"
    }
    
  }
  finally {prisma.$connect}
}
