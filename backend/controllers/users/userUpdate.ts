import { PrismaClient } from "@prisma/client";
import { update, findmail } from "../../services/user";
import { IuserUpdate } from "../../interfaceTS";
import verifyJWT from "../../middleware/authJWt";

import {sendMailCreate, sendMailChangePassword} from "../../config/mail";
import { generateString } from "../../utils";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()

export const  updateController = async (data: IuserUpdate , autorization: any) => {
  const token = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }  
  
  let random = generateString(64)
  let now : Date | number = new Date()
  let newtype = 'validation'
  now = Math.floor(now.getTime()/1000)
  let {email, password} = data
  

  let newdata : IuserUpdate = {
    id
  }
  if (email !="") {
    newdata = {
      ...newdata, 
      email, 
      validate: random + '&' + now,
    }
  }

  if (password !=="") { newdata = {...newdata, password : bcrypt.hashSync(password!)}}
  await update(newdata)
  try {
    if (email == "" && password != "") {
      let datafound = {
        id
      }
      let found: any = await findmail(datafound)
      if(!await found) {
        return {
          status : 400,
          message : "une erreur inconnu est survenue"
        }
      }
      else {
        sendMailChangePassword(await found)
        try {
          return {
            status : 200,
            message : "ok"
          }
        }
        catch(err) {
          return {
            status : 400,
            message : "une erreur inconnu est survenue"
          }
        }
      }
    }
    else if (email != "" && password == "") {
      let datamail = {
        ...data, 
        validate:  newtype + '/' + random + '&' + now
      }
      await sendMailCreate(datamail)
      try {
        return {
          status : 200, 
          message : " un mail de confirmation vien d'etre envoyer"
        }
      }
      catch(err) {
        return {
          status : 400, 
          message : "une erreur innatendu est survenue"
        }
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