export interface IConfig {
    port: number | string
}

export interface Iiduser   {
  id : string
}

export interface Iuser extends  Iiduser   {
    email : string,
    password : string
    birthday : Date,
    role : "parent" | "student",
    validate? : string
}

 export interface IuserUpdate extends  Iiduser  {
  email? : string,
  birthday? : Date,
  role? : "parent" | "student",
  validate? : string
}

export interface ItableContent {
    name : string
    result : string
}