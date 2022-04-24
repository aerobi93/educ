import { PrismaClient } from "@prisma/client";
import { Iuser } from "../interfaceTS";

const prisma = new PrismaClient()

export const login = async (data : Iuser) =>  {
  const {email} = data
    const user =  prisma.users.findFirst({
      where : {
        email
      },
      select : {
       id : true,
       validate : true,
       password : true
      }
  })
  return user
}