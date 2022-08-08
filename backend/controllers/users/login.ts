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
   
    const  verif = await verifyJWT(autorization!)
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
  let { password, validate, role, id}: any = await login(data)
  try {
    if (!id) {
      return {
        status : 401,
        message: 'utilisateur non trouve'
      }
    }

    if (!bcrypt.compareSync(data.password, password)) {   
      return {
        message : 'erreur de mot de passe',
        status: 401
      }
    }
  
    else if (validate !== "valid") {
      return {
        status : 200,
        message: 'compte non valider'
      }
    }
    
    else return {
      status: 200,
      message :'connexion ok',
      role : role,
      token : await JWTcreation(id, (60 * 60 * 24), role)
    }
  }
  catch(e) {
    return {
      status: 400,
      message : "erreur innatendu"
      }
  }
  finally {
    prisma.$disconnect
  }
}