import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";

const prisma = new PrismaClient()

export const countUser = (data : Iuser) =>  {

  const {email, id} = data 
  if (email) {
      const user =  prisma.users.count({ where:{email}})
  return user
  }
  else if (id) {
    const user =  prisma.users.count({where : {id}})
    return user
  }
}