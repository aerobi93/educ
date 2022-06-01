import { PrismaClient } from "@prisma/client";
import {findAll} from "../../services/user";
import verifyJWT from "../../middleware/authJWt";


const prisma = new PrismaClient()

export const  findUser = async (autorization: any) => {
  const {token} = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }
  let data = {
    id
  }
  await findAll(data)
  try {
    return {
      message: {
        message: await findAll(data),
        role,
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