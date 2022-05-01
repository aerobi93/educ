import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

import { Iuser } from "../interfaceTS";
import { login } from "../services/login";
import { countUser } from "../services/count";
import JWTcreation from "../middleware/createJWT";


const prisma  = new PrismaClient()
export const loginController = async(data : Iuser) => {
  if (!data.password || !data.email) {
    return  {
      message : "l'email ou le mot de passe ne peut pas être vide ",
      statut : 401
    }
  }
  await countUser(data)
  try {
    if (await countUser(data)) {
      if (await countUser(data) == 0) {
        return {
          status: 204,
          message: "aucun utilisateur trouvé"
        }
      }
      else if(await login(data)) {
        let { password}: any = await login(data)
        if (!bcrypt.compareSync(data.password, password)) {
          return {
            message : 'erreur de mot de passe',
            status: 401
          }
        }
        let {id, role, validate} : any = await login(data)
        if (validate !== "validate") {
          return {
              status : 401,
              message: 'compte non validé'
            }
          }
        if (!id) {
          return {
            status : 402,
            message: 'utilisateur non trouvé'
          }
        }
        return {
           status: 200,
          message : await JWTcreation(id, role)
        }
      }

      else if (!await login(data)) {
        return {
           status: 401,
           messsage :"erreur inattendu"
        }
      }
    }
    else if (!await countUser(data)) {
      return {
        message:'erreur inattendu',
        status: 401
      }
    }
  }
  catch(e) {
    return e
  }
  finally {
    prisma.$disconnect
  }
}