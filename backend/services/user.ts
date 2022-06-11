import {PrismaClient} from "@prisma/client";
import { Ichild, Iiduser, Iuser, IuserUpdate } from "../interfaceTS";

const prisma = new PrismaClient()

export const create = async (data : Iuser) => {
    let add = await prisma.users.create({
        data
    })
  return await add 
}


export const findAll = async (data: Iuser) => {
  
 if (data.role === "parent") {
  const findData = prisma.users.findUnique({
    where : {
      id: data.id
    },
    select : {
      student : {
        select : {
          name : true,
          results : true
        },
      }
    }
  })
  return await findData
 }
  else {
    const findData = prisma.users.findUnique({
      where : {
        id: data.id
      },
      select : {
        results : true
      }
    })
  }
}

export const update =async (data: IuserUpdate) => {
  let {id, email} = data
  
  if(email) {
    const updateUser =  prisma.users.update({where: { email }, data })
    return updateUser
  }
  if(id) {
    const updateUser =  prisma.users.update({where: { id }, data })
    return updateUser
  }
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
    }, 
  })
  return findmail
}
