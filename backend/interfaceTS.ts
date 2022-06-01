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
export interface Ichild extends  Iiduser   {
  birthday : Date,
  role : "student",
  name: string,
  childId : string
}
 export interface IuserUpdate  {
  id?: string
  email? : string,
  birthday? : Date,
  role? : "parent" | "student",
  validate? : string
}

export interface InewValidationCode {
  type: string,
  validate: string,
  email: string
}

export interface ItableContent {
    name : string
    result : string
}