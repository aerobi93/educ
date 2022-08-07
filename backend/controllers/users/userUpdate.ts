import { PrismaClient } from "@prisma/client";
import { update, findmail } from "../../services/user";
import { IuserUpdate } from "../../interfaceTS";
import verifyJWT from "../../middleware/authJWt";
import JWTcreation from "../../middleware/createJWT";

import {sendMailCreate, sendMailChangePassword} from "../../config/mail";
import bcrypt from "bcryptjs"
import { countUser} from '../../services/count';

const prisma = new PrismaClient()

export const  updateController = async (data: IuserUpdate , autorization: any) => {
  const token = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
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
     
    }

    if (email !== "") {
      let newData = {
        email : email!
      }
      let count  = await countUser(newData)
      if (await count! > 0) {
        return {
          status : 400,
          message : 'cette adresse email existe deja dans notre base'
        }
      }
    }
    await JWTcreation(id, 60 * 15 , role)
    try {
      await update(newData)
      try {
        await sendMailCreate(data.email!, token)
        try {
          return {
            status : 200,
            message : "un message de confirmation a ete envoyer"
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