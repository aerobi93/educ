import { PrismaClient } from "@prisma/client";
import { sendNewCodevalidation } from "../../config/mail";
import { findmail, findId } from "../../services/user";
import verifyJWT from "../../middleware/authJWt";
import JWTcreation from "../../middleware/createJWT";

const prisma  = new PrismaClient()
console.log("test")
export const newCodeController =  async(data :any, token: any ) => {
  const {email, type} = data  
  let newData: any = {}
  if (email ) {
    newData =  {
      ...await findId(data) 
    }
    newData = {
      ...newData,
      email
    }
  }
  else if (!email) {
    let {id, role } : any = await verifyJWT(token)
    let mailFound = await findmail({id})
    console.log(email)
    newData = {
      id, 
      role, 
      email : mailFound?.email
    }
  }
  let Jwt = await JWTcreation(newData!.id, 60 * 15, newData!.role)
  try {
    console.log(Jwt)
    await sendNewCodevalidation(newData.email, type, Jwt)
    try {
      console.log("mail")
      let message = "un email"
      if (type === "validation") {message += " de validation "}
      if (type === "delete") {message += " pour supprimer le compte "}
      if (type === "passwordForgotten") {message += " pour changer le mot de passe "}
      message += " a ete envoyer"
      return {
        status : 200,
        message 
      }
    }
    catch {
      return {
        message : "une erreur innatendu est survenue",
        status : 400
      }
    }
  }
  catch {
    return {
      message : "une erreur innatendu est survenue",
      status : 400
    }
  }
  
  finally {
    prisma.$disconnect
  }
}