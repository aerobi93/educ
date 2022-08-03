import nodemailer from 'nodemailer'

  export const connexion = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAIL_ADD,
      pass: process.env.MAIL_PASS,
    }
  })
