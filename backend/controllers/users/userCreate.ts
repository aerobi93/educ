import {PrismaClient } from "@prisma/client";
import {sendMailCreate} from "../../config/mail";
import {generateString} from '../../utils'
import bcrypt from "bcryptjs"
import { Iuser } from "../../interfaceTS";
import {create as createUserService} from "../../services/user";


const prisma = new PrismaClient()


export const create = async (data : Iuser) => {

  let random = generateString(64)
  let now : Date | number = new Date()
  let newtype = 'validation'

  now = Math.floor(now.getTime()/1000)
  
  data = {
      ...data,
      password: bcrypt.hashSync(data.password!),
      validate: random + '&' + now
  }
  let datamail = {
      ...data, 
      validate:  newtype + '/' + random + '&' + now
  }
  await createUserService(data)
  try {
    await sendMailCreate(datamail)
      return {
        status : 201,
        message: 'un mail de confirmation a été envoyer'
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


