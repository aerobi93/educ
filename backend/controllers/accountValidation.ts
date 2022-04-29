import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";
import JWTcreation from "../middleware/createJWT";
import { accountValidation } from "../services/accountValidation";

const prisma  = new PrismaClient()

export const accountValidationController = async(data : Iuser) =>  {
 await accountValidation(data)
  try {
    if (!await accountValidation(data)){
      return {
        status : 401,
        message : 'lien non valide'
      }
    }
    let {id, role }: any = await accountValidation(data)

    console.log(id, role)
    if (!id || !role ) {
      return {
        status : 401,
        message: "une erreur inattendu est survenue"
      }
    }
    return {
      status: 200,
      message : await JWTcreation(id, role)
    }
  }
  catch(e) {
    return e
  }
  finally {prisma.$connect}
}
