import { PrismaClient } from "@prisma/client";
import { Iresults } from "../../interfaceTS";
import {findAllResults} from "../../services/results";

import verifyJWT from "../../middleware/authJWt";

const prisma = new PrismaClient()

export const  findAll = async (autorization: any) => {
    const {token} = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id, role} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }

  await findAllResults(id)
  try {
    return {
      message: await findAllResults(id),
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