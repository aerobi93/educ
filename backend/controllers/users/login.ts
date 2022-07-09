import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

import { Iuser } from "../../interfaceTS";
import { login } from "../../services/login";
import JWTcreation from "../../middleware/createJWT";


const prisma  = new PrismaClient()
export const loginController = async(data : Iuser) => {
  if (!data.password || !data.email) {
    return  {
      message : "l'email ou le mot de passe ne peut pas être vide ",
      status : 401
    }
  }
  await login(data)
  try {
    let { password}: any = await login(data)
    if (!bcrypt.compareSync(data.password, password)) {
      return {
        message : 'erreur de mot de passe',
        status: 401
      }
    }
    let {id, role, validate} : any = await login(data)
    if (validate !== "valid" && validate.includes("validate")) {
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
      message : {
        message: 'connexion ok',
        role : role,
        token : await JWTcreation(id, role)
      } 
    }
  }
  catch(e) {
    return {
      status: 401,
      message : "erreur innatendu"
      }
  }
  finally {
    prisma.$disconnect
  }
}