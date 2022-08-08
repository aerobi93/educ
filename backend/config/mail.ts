import {connexion} from '../config/configMail'

export const sendMailCreate =  async(email : string, token? : string )  => {
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to: email,
    subject: "creation de compte studies",
    html: `
      <strong>bienvenue sur studies </strong>
      <br/>
      votre compte doit etre valider
      <br/>
      <a href="http://localhost:3000/validation/validation/${token}"> validez le compte </a>
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
  
  export const sendNewCodevalidation =  async(email : string, type: string,  token: string ) => {
   let title
   let link
   if (type === 'passwordForgotten') {
    title = "demande de changement de mot de passe"
    link = "changer de mot de passe"
   }
  
   if (type == "validation") {
    title = "validation du compte"
    link = "valider le compte"
   }
   
   if (type == 'delete') {
    title = "demande de supression de compte"
    link = "suprimer deffinitivement"
   }
  
    
    const message = {
    from: '"Studies" <studies-rom@outlook.fr>',
    to: email,
    subject: title,
    html: `
  
      <a href="http://localhost:3000/validation/${type}/${token}"> ${link} </a>
      <br/>
      `
    }
    await connexion.sendMail(message)
   
  }
  
  export const sendMailChangePassword =  async(data: any  ) => {
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

  export const sendMailupdateEmail = async (email : string, token? : string ) => {
    const message = {
      from: '"Studies" <studies-rom@outlook.fr>',
      to: email,
      subject: "modification email",
      html: `
      
        <br/>
        votre email vien d 'etre midifier et necessite la valide du mail 
        <br/>
        <a href="http://localhost:3000/validation/validation/${token}"> validez le compte </a>
        <br/>
        `
      }
      await connexion.sendMail(message)
  }