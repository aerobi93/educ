import { PrismaClient } from "@prisma/client";
import {findAll} from "../../services/user";
import verifyJWT from "../../middleware/authJWt";



const prisma = new PrismaClient()

export const  findUser = async (autorization: any) => {
  const  {status, message, id, role} : any = await verifyJWT(autorization)
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }

  await findAll(id, role)
  try {
    return {
      message: "user data trouver",
      data: await findAll(id, role),
      status : 200
    }
  }
  catch(e) {
    return {
      status : 400,
      message: 'une erreur inattendu est survenue'
    }
  }
  finally {
    prisma.$disconnect
  }

}