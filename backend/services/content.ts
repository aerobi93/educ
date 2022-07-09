import { PrismaClient } from "@prisma/client";
import { ItableContent } from "../interfaceTS";

const prisma = new PrismaClient()

export const createContent = async (data : ItableContent) =>  {
 const add = prisma.tableContents.create({
    data
  })
  return await add
}

export const findAllContent = async () =>  {
  const findAll = prisma.tableContents.findMany({
    select : { name : true}
  })
  return await findAll
}

export const updateContent = async(data : ItableContent) =>  {
  const update = prisma.tableContents.update({
    data, 
    where: {
      id: data.id
    }
  })
  return await update
}

export const deleteContent = async(data : ItableContent) =>  {
  const deleteC = prisma.tableContents.delete({
    where: {
      name: data.name
    }
  })
  return await deleteC
}