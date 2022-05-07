import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";
import { countUser } from "../services/count";


const prisma  = new PrismaClient()

export const countUserController =  async(data :Iuser) => {
  
  await countUser(data)
  try {  
    if (!await countUser(data) || await countUser(data)! < 0) {
      return {
      status: 200,
      message : await countUser(data)
      }
    }
    return {
      status : 200,
      message :await countUser(data)
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