import { PrismaClient } from "@prisma/client";
import {create} from "../services/user";
import verifyJWT from "../middleware/authJWt";
import { Iuser,} from "../interfaceTS";


const prisma = new PrismaClient()

export const createAccountChild = async(data : Iuser, autorization: any) => {
  const {token} = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }
  let newData = {
    ...data,
    childId: id,
  }
  await create(newData)
 
  try {
      return {
        status : 201,
        message: 'compte enfant cree'
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
