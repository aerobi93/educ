import {PrismaClient } from "@prisma/client";
import {sendMailCreate} from "../config/configMail";
import {generateString} from '../utils'
import bcrypt from "bcryptjs"
import { Iuser } from "../interfaceTS";
import {create as createUserService} from "../services/user";
import { countUser } from '../services/count' 


const prisma = new PrismaClient()


export const create = async (data : Iuser) => {
    
  if (await countUser(data)! > 0) {
    return {
      status: 400,
      message: 'un compte existe déja avec cet email'
    }
  }
  let random = generateString(64)
  let now : Date | number = new Date()
  now = Math.floor(now.getTime()/1000)
  let newtype = 'validation'

  let link = newtype + '/' + random + '&' + now

  
  data = {
      ...data,
      password: bcrypt.hashSync(data.password),
      validate: random + '&' + now
  }
  let datamail = {
      ...data, 
      validate: link
  }
  await createUserService(data)
  try {
    await sendMailCreate(datamail)
      return {
        status : 200,
        message: 'un mail de confirmation a été envoyer'
      }
    }
  catch(err) {
    return {
      status : 401,
      message: 'une erreur inattendu est survenue'
    }
  }
  finally {
      prisma.$disconnect
  }
}


