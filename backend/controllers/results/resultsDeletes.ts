import { PrismaClient } from "@prisma/client";
import { Iresults } from "../../interfaceTS";
import {deleteResults} from "../../services/results";

import verifyJWT from "../../middleware/authJWt";

const prisma = new PrismaClient()

export const  deleteR = async (data: Iresults, autorization: any) => {
    const token = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }
  if (!data.id) {
    data = {
      ...data,
      userID : id
    }
  }
  await deleteResults(data)
  try {
    return {
      message: "resultats suprimer",
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