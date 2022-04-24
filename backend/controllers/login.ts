import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

import { Iuser } from "../interfaceTS";
import { login } from "../services/login";
import { countUser } from "../services/count";
import JWTcreation from "../middleware/createJWT";


const prisma  = new PrismaClient()
export const loginController = async(data : Iuser) => {
  if (!data.password || !data.email) {
    return  401
  }

let statut
await countUser(data)
  try {
    if (await countUser(data)) {
      if (await countUser(data) == 0) {
          return statut = 204
      }
      else if(await login(data)) {
        let { password}: any = await login(data)
        if (!bcrypt.compareSync(data.password, password))
        {return 401}
        let {id} : any = await login(data)
        console.log('found')
        if (!id) {
          return 
        }
        return (
          statut = 200,
          JWTcreation(id)
        )
      }
      else if (!await login(data)) {
        return statut = 401
      }
    }
    else if (! await countUser(data)) {
      return statut= 204
    }
  }
  catch(e) {
    return e
  }
  finally {
    prisma.$disconnect
  }
}