import { PrismaClient } from "@prisma/client";
import { ItableContent } from "../../interfaceTS";
import {updateContent} from "../../services/content";

const prisma = new PrismaClient()

export const  update = async (data: ItableContent) => {
  await updateContent(data)
  try {
    return {
      message: "mise a jour effectue",
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