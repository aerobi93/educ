import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";
import JWTcreation from "../middleware/createJWT";
import { accountValidation } from "../services/accountValidation";
import { update } from "../services/user";

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
    if (!id || !role ) {
      return {
        status : 401,
        message: "une erreur inattendu est survenue"
      }
    }
     data = {
      ...data,
      id,
      validate: 'valid'
    }
    if (await update(data)) {
      await update(data)
      return {
        status: 200,
        message : await JWTcreation(id, role)
      }
    }
    else if (!await update(data)){
      return {
        status : 401,
        message : 'une erreur inattendu est survenue'
      }
    }

  }
  catch(e) {
    return e
  }
  finally {prisma.$connect}
}
