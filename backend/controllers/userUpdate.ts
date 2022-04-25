import { PrismaClient } from "@prisma/client";
import { update } from "../services/user";
import { IuserUpdate } from "../interfaceTS";
import verifyJWT from "../middleware/authJWt";

const prisma = new PrismaClient()

export const  updateController = async (data: IuserUpdate , autorization: any) => {
  const {token} = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }
  data = {
    ...data,
    id
  }
  await update(data)
  try {
    return {
      message: "modification effectuer",
      status : 200
    }
  }
  catch(e) {
    return e
  }
  finally {
    prisma.$disconnect
  }
}