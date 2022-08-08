import { PrismaClient } from "@prisma/client";
import { update, findmail } from "../../services/user";
import { IuserUpdate } from "../../interfaceTS";
import verifyJWT from "../../middleware/authJWt";
import JWTcreation from "../../middleware/createJWT";

import {sendMailupdateEmail, sendMailChangePassword} from "../../config/mail";
import bcrypt from "bcryptjs"
import { countUser} from '../../services/count';

const prisma = new PrismaClient()

export const  updateController = async (data: IuserUpdate , autorization: any) => {
 
  const  {status, message, id, role} : any =  await verifyJWT(autorization!)
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  } 
  const {email, password} = data
   if(email !== "" && password == "") {
    let newData : IuserUpdate = {
      email, 
      id,
      validate : "noValid"
     
    }

    if (email !== "") {
      let newData = {
        email : email!
      }
      let count  = await countUser(newData)
      if (await count! > 0) {
        return {
          status : 400,
          message : 'cette adresse email existe deja'
        }
      }
    }
    await JWTcreation(id, 60 * 15 , role)
    try {
     let test = await update(newData)
      try {
        await sendMailupdateEmail(data.email!, autorization)
        try {
          return {
            status : 200,
            message : "un email de confirmation a ete envoyer"
          }
        }
        catch {
          return {
            status : 400,
            message : "une erreur innatendu est survenue"
          }
        }
      }
      catch {
        return {
          status : 400,
          message : "une erreur innatendu est survenue"
        }
      }
    }
    catch {
      return {
        status : 400,
        message : "une erreur innatendu est survenue"
      }
    }
    finally {
      prisma.$disconnect
    }
   }

   else if (email == "" && password !== "") {
    let email = await findmail({id})
    try {
      let newData = {
        password : bcrypt.hashSync(password!),
        id
      }
      await update(newData)
      try {
        sendMailChangePassword(email)
        try {
          return {
            status : 200,
            message : "le mot de passe a ete modifier"
          }
        }
        catch {
          return {
            status : 400,
            message : "une erreur innatendue est survenue"
          }
        }
      }
      catch {
        return {
          status : 400,
          message : "une erreur innatendue est survenue"
        }
      }
    }
    catch {
      return {
        status : 400,
        message : "une erreur innatendue est survenue"
      }
    }
    finally {
      prisma.$disconnect
    }
   }
  


 
}