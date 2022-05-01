import { PrismaClient } from "@prisma/client";
import { sendNewCodevalidation } from "../config/configMail";
import { Iuser } from "../interfaceTS";
import { countUser } from "../services/count";
import { update } from "../services/user";
import { generateString } from "../utils";

const prisma  = new PrismaClient()

export const newValidationCodeController =  async(data :Iuser) => {
  console.log(data)
  if (await countUser(data)! < 0) {
    return {
      status: 401,
      message : "aucun utilisateur trouvé"
    }
  }
  let link = generateString(32)
  data = {
    ...data,
    validate: link
  }
  await update(data)
  try {  
    sendNewCodevalidation(data)
    return {
      status : 200,
      message : "mise a jour effectué"
    }
  }
  catch(e){
    return e
  }
  finally {
    prisma.$disconnect
  }
}