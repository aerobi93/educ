import { PrismaClient } from "@prisma/client";
import { deleteU , findmail} from "../services/user";
import verifyJWT from "../middleware/authJWt";
import { sendMailDelete } from "../config/configMail";

const prisma = new PrismaClient()

export const  deleteController = async (autorization: any) => {
  const {token} = autorization
  const  verif = await verifyJWT(token!)
  const  {status, message, id} : any = await verif 
  if (await status !== 200 || !id) { 
    return {
      message,
      status
    }
  }
  let data = {
    id
  }

  let {email}: any= await findmail(data)
  
  sendMailDelete(email)
  if (!await sendMailDelete(email)) {
    return
  }
  deleteU(data)
  try {
    return {
      message: "supression effectuer",
      status : 200
    }
  }
  catch(e) {
    return e
  }
  finally {
    prisma.$disconnect
  }

}