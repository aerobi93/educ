import { PrismaClient } from "@prisma/client";
import { sendNewCodevalidation } from "../config/configMail";
import { Iuser } from "../interfaceTS";
import { countUser } from "../services/count";
import { update } from "../services/user";
import { generateString } from "../utils";


const prisma  = new PrismaClient()

export const newValidationCodeController =  async(data :Iuser, type: string) => {

  if (!await countUser(data) || await countUser(data)! < 0) {
    return {
      status: 401,
      message : "aucun utilisateur trouvé"
    }
  }

  let random = generateString(32)
  let now : Date | number = new Date()
  now = Math.floor(now.getTime()/1000)
  
  let link = type + '/' + random + '&' + now
  
  data = {
    ...data,
    validate: random + '&' + now
  }

  let datamail = {
    ...data,
    validate: link
  }
  await update(data)
  try {  
    sendNewCodevalidation(datamail)
    return {
      status : 200,
      message : "nouveau lien envoyer par mail"
    }
  }
  catch{
    return {
      status : 401,
      message : "erreur innatendu est survenu"
    }
  }
  finally {
    prisma.$disconnect
  }
}