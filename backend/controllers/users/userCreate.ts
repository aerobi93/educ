import {PrismaClient } from "@prisma/client";
import {sendMailCreate} from "../../config/mail";
import { Iuser } from "../../interfaceTS";
import {create as createUserService, findId} from "../../services/user";
import JWTcreation from "../../middleware/createJWT";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()


export const create = async (data : Iuser) => {

  let newData = {
    ...data, 
    password: bcrypt.hashSync(data.password!),
  }
  await createUserService(newData)
  try {
    //if found we search the id for create the validation token 
    let newdata = await findId(newData) 
    try {
       let token = await JWTcreation(newdata!.id , 60 * 15, newdata!.role)
      try {
        await sendMailCreate(data.email, token)
        try {
          return {
            status : 201,
            message: 'un email de confirmation a ete envoyer'
          }
        }
        catch{
          return {
            status : 400,
            message: 'une erreur inattendu est survenue'
          }
        }
      }
      catch {
        return {
          status : 400,
          message: 'une erreur inattendu est survenue'
        }
      }
    }
    catch {
      return {
        status : 400,
        message: 'une erreur inattendu est survenue'
      }
    }
  }
  catch(err) {
    return {
      status : 400,
      message: 'une erreur inattendu est survenue'
    }
  }
  finally {
      prisma.$disconnect
  }
}


