import { PrismaClient } from "@prisma/client";
import { Iresults } from "../interfaceTS";

const prisma = new PrismaClient()

export const createResults = async (data : any) =>  {

 const add = prisma.results.create({
 data
  })
  return await add
}

export const findAllResults = async (id : string) =>  {
  const findall = prisma.results.findMany({
     where : {
       userID: id
     }
   })
   return await findall
 }
 
 export const updateResults = async (data : Iresults) =>  {
  const update = prisma.results.update({
     where : {
       id : data.id
     },
     data
   })
   return await update
 }

 export const deleteResults = async (data : Iresults) =>  {
   if (data.id) {
    const deleteR = prisma.results.delete({
      where : {
        id : data.id
      },
    })
    return await deleteR
   }
   if (data.userID) {
    const deleteR = prisma.results.deleteMany({
      where : {
        userID : data.userID
      },
    })
    return await deleteR
   }

   
 }