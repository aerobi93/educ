import nodemailer from 'nodemailer'
import {InewValidationCode, Iuser, IuserUpdate } from '../interfaceTS'
import {connexion} from '../config/configMail'

export const sendMailCreate =  async(data: IuserUpdate  ) => {
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to: data.email,
    subject: "creation de compte studies",
    html: `
      <strong>bienvenue sur studies </strong>
      <br/>
      votre compte doit etre valider
      <br/>
      <a href="http://localhost:3000/${data.validate}"> validez le compte </a>
      <br/>
      `
    }
    await connexion.sendMail(message)
   
  }
  export const sendMailDelete = async (email :string  ) => {
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to:  email,
    subject: "suppression de compte studies",
    html: 
      '<strong>votre compte a bien ete supprime </strong>'
    }
    const send = await connexion.sendMail(message)
    return send
  }
  
  export const sendNewCodevalidation =  async(data: InewValidationCode  ) => {
   let title
   let link
  console.log(data)
   if (data.type === 'passwordForgotten') {
    title = "demande de changement de mot de passe"
    link = "changer de mot de passe"
   }
  
   if (data.type == "validate") {
    title = "validation du compte"
    link = "valider le compte"
   }
   
   if (data.type == 'delete') {
    title = "demande de supression de compte"
    link = "suprimer deffinitivement"
   }
  
    
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to: data.email,
    subject: title,
    html: `
  
      <a href="http://localhost:3000/${data.validate}"> ${link} </a>
      <br/>
      `
    }
    await connexion.sendMail(message)
   
  }
  
  export const sendMailChangePassword =  async(data: any  ) => {
    console.log(data, data.email, "email")
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to: data.email,
    subject: "changement de mot de passe",
    html: `
      <strong>changement de mot de passe </strong>
      <br/>
      votre mot de passe vien d' etre modifier
     
      `
    }
    await connexion.sendMail(message)
   
  }