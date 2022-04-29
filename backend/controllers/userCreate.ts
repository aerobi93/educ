import {PrismaClient } from "@prisma/client";
import {sendMailCreate} from "../config/configMail";
import {generateString} from '../utils'
import bcrypt from "bcryptjs"
import { Iuser } from "../interfaceTS";
import {create as createUserService} from "../services/user";


const prisma = new PrismaClient()


export const create = async (data : Iuser) => {
    let link = generateString(32)
    data = {
        ...data,
        password: bcrypt.hashSync(data.password),
        validate: link
    }
    let datamail = {
        ...data, 
        validate: link
    }
    await createUserService(data)
    try {
        sendMailCreate(datamail)
        return 'utilisateur créé'
    }
    catch(err) {
        throw err
    }
    finally {
        prisma.$disconnect
    }
}


