import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

import { Iuser } from "../../interfaceTS";
import { login } from "../../services/login";
import JWTcreation from "../../middleware/createJWT";
import verifyJWT from "../../middleware/authJWt";
import { findmail } from "../../services/user";


const prisma  = new PrismaClient()
export const loginController = async(data : Iuser, autorization: any) => {
  if( !data.email ) {
    let token = autorization
    console.log(token, "token")
    const  verif = await verifyJWT(token!)
    const  {status, message, id} : any = await verif 
    if (await status !== 200 || !id) { 
      return {
        message,
        status
      }
    }
    let ID = {
      id
    }
    let {email}: any= await findmail(ID)
    data = {
      ...data,
      email
    }
  }

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