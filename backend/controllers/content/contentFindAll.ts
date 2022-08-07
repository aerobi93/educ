import { PrismaClient } from "@prisma/client";
import { ItableContent } from "../../interfaceTS";
import {findAllContent} from "../../services/content";

const prisma = new PrismaClient()

export const  findAll = async () => {
  await findAllContent()
  try {
    return {
      message : "content data trouver",
      data: await findAllContent(),
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