import { PrismaClient } from "@prisma/client";
import { IuserUpdate } from "../interfaceTS";

const prisma = new PrismaClient()

export const countUser = (data : IuserUpdate ) =>  {

  const {email, id} = data!
  if (email) {
      const user =  prisma.users.count({ where:{email}})
  return user
  }
  else if (id) {
    const user =  prisma.users.count({where : {id}})
    return user
  }
}