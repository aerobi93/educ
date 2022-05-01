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
  let link = generateString(32)
  data = {
      ...data,
      password: bcrypt.hashSync(data.password),
      validate: link
  }
  let datamail = {
      ...data, 
      validate: link
  }
  await sendMailCreate(datamail)
  await createUserService(data)
  try {
      return {
        status : 200,
        message: 'un mail de confirmation a été envoyer'
      }
    }
  catch(err) {
      throw err
  }
  finally {
      prisma.$disconnect
  }
}


