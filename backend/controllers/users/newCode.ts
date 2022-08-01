import { PrismaClient } from "@prisma/client";
import { sendNewCodevalidation } from "../../config/mail";
import { InewValidationCode  } from "../../interfaceTS";
import { update, findmail } from "../../services/user";
import { generateString } from "../../utils";
import verifyJWT from "../../middleware/authJWt";


const prisma  = new PrismaClient()

export const newCodeController =  async(data :InewValidationCode, token: any ) => {
  const {email, type} = data
  let found : any
  let random = generateString(64)
  let now : Date | number = new Date()
  now = Math.floor(now.getTime()/1000)
  
  if (!email && token ) {
    const  verif = await verifyJWT(token!)
    const  {status, message, id, role} : any = await verif 
    if (await status !== 200 || !id) { 
      return {
        message,
        status
      }
    }
    let data = {id}
    found = await findmail(data)
  }

  console.log(type, "test")
  let newData = {
    email : email ? email : found.email,
    validate: type === "validate"  ? 
      random + type + '&' + now : 
      random  + '&' + now
  }

  let datamail = {
    email : email ? email : found.email,
    type,
    validate: type === "validate" ? 
      type + '/' + random +  type + '&' + now : 
      type + '/' + random  + '&' + now
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