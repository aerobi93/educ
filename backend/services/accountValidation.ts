import { PrismaClient } from "@prisma/client";
import { IuserUpdate } from "../interfaceTS";

const prisma = new PrismaClient()

export const accountValidation = (data : IuserUpdate) =>  {
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

