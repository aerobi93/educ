import {PrismaClient} from "@prisma/client";
import { Iiduser, Iuser, IuserUpdate } from "../interfaceTS";

const prisma = new PrismaClient()

export const create = async (data : Iuser) => {
    let add = await prisma.users.create({
        data
    })
  return await add 
}

export const update =async (data: IuserUpdate) => {
  let {id} = data
  const updateUser =  prisma.users.update({
    where : {
      id
      },
    data
  })
  return updateUser
}

export const deleteU = async (data :Iiduser) => {
   let {id} = data
  const deleteUser = prisma.users.delete({
    where:{
      id
    }
  })
  return deleteUser
}

export const findmail = async(data :Iiduser) => {
  let {id} = data
  const findmail = prisma.users.findUnique({
    where : {
      id
    },
    select: {
      email : true
    }
  })
  return findmail
}
