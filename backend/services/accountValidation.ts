import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";

const prisma = new PrismaClient()

export const accountValidation = (data : Iuser) =>  {
  let {validate} = data
  let validatation = prisma.users.findFirst({
    where : {
      validate
    },
    select: {
      id : true, 
      role: true
    }
  })
  return validatation
}

