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
      message : "email ou mot de passe ne peut pas etre vide ",
      statut : 401
    }
  }
  await countUser(data)
  try {
    if (await countUser(data)) {
      if (await countUser(data) == 0) {
        return {
          status: 204,
          message: "aucun utilisateur trouve"
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
        let {id, role} : any = await login(data)
        if (!id) {
          return {
            status : 401,
            message: 'utilisateur non trouve'
          }
        }
        return {
           status: 200,
          message : await JWTcreation(id, role)
        }
      }

      else if (!await login(data)) {
        return{
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