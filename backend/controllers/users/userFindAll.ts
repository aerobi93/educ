import { PrismaClient } from "@prisma/client";
import {findAll} from "../../services/user";
import verifyJWT from "../../middleware/authJWt";



const prisma = new PrismaClient()

export const  findUser = async (autorization: any) => {
  let token = autorization
   const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }

  await findAll(id, role)
  try {
    return {
      message: {
        message: await findAll(id, role),
        role
      },
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