import { PrismaClient } from "@prisma/client";

import { Iuser } from "../../interfaceTS";
import { deleteU } from "../../services/user";
import verifyJWT from "../../middleware/authJWt";

const prisma  = new PrismaClient()

export const deleteChildController =  async (id : Iuser, autorization: any) => {
  const token = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message} : any = await verif 
  if (await status !== 200) { 
    return {
      message,
      status
    }
  }

  await deleteU(id)
  try{
    return {
      status : 200,
      message : 'compte enfant supprimer'
    }
  }
  catch{
    return {
      message : "error",
      status : 400
    }
  }


}