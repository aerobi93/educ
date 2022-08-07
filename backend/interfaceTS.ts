export interface IConfig {
    port: number | string
}

export interface IJWT  {
  id : string, 
  exp : number, 
  role? : string
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
  password? : string, 
  birthday? : Date,
  role? : "parent" | "student",
  validate? : string
}


export interface ItableContent {
  id: string,
  name : string
}

export interface Iresults {
  id : string
  exam: boolean,
  note: number,
  timeRest : string,
  userID: string
  contentID : string

}