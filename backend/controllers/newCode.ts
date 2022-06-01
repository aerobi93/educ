import { PrismaClient } from "@prisma/client";
import { sendNewCodevalidation } from "../config/configMail";
import { InewValidationCode  } from "../interfaceTS";
import { update } from "../services/user";
import { generateString } from "../utils";


const prisma  = new PrismaClient()

export const newCodeController =  async(data :InewValidationCode ) => {
  const {email, type} = data
  let random = generateString(64)
  let now : Date | number = new Date()
  now = Math.floor(now.getTime()/1000)
  
  let newData = {
    email,
    validate: random + '&' + now
  }

  let datamail = {
    email,
    type,
    validate: type + '/' + random + '&' + now ,
  }
  await update(newData)
  try {  
    sendNewCodevalidation(datamail)
    return {
      status : 200,
      message : "nouveau lien envoyer par mail"
    }
  }
  catch(e){
    return {
      status : 401,
      message : "erreur innatendu est survenu"
    }
  }
  finally {
    prisma.$disconnect
  }
}