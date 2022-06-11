import { PrismaClient } from "@prisma/client";
import { Iresults } from "../../interfaceTS";
import {createResults} from "../../services/results";

import verifyJWT from "../../middleware/authJWt";

const prisma = new PrismaClient()

export const  create = async (data: Iresults, autorization: any) => {
    const token = autorization
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
    userID: id,
  }
  await createResults(newData)
  try {
    return {
      message: "note ajoute",
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