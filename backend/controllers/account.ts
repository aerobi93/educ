import {PrismaClient } from "@prisma/client";
import sendmail from "../configMail";
import {generateString} from '../utils'
import { Iuser } from "../interfaceTS";
import {create as createUserService} from "../services/account";


const prisma = new PrismaClient()


export const create = async (data : Iuser) => {
    let password = generateString(32)
    data = {
        ...data,
        password
    }
    await createUserService(data)
    try {
        sendmail(data)
        return 'utilisateur créé'
    }
    catch(err) {
        throw err
    }
    finally {
        prisma.$disconnect
    }
}


