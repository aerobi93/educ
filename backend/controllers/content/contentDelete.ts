import { PrismaClient } from "@prisma/client";
import { ItableContent } from "../../interfaceTS";
import {deleteContent} from "../../services/content";

const prisma = new PrismaClient()

export const  deleteC = async (data: ItableContent) => {
  await deleteContent(data)
  try {
    return {
      message: "contenu supprime",
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