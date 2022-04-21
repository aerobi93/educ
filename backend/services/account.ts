import {PrismaClient} from "@prisma/client";
import { Iuser } from "../interfaceTS";

const prisma = new PrismaClient()

export const create = async (data : Iuser) => {

    let {birthday} = data
    birthday = new Date(birthday)
    data = {
        ...data,
        birthday
    }
    let add = await prisma.users.create({
        data
    })
    return await add 
}

