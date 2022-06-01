import { PrismaClient } from "@prisma/client";
import { ItableContent } from "../../interfaceTS";
import {createContent} from "../../services/content";

const prisma = new PrismaClient()

export const  create = async (data: ItableContent) => {
  await createContent(data)
  try {
    return {
      message: "contenue ajoute",
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