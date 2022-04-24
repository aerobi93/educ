export interface IConfig {
    port: number | string
}

export interface Iuser {
    id : string,
    email : string,
    password : string
    birthday : Date,
    role : "parent" | "student",
    validate : boolean
}

export interface ItableContent {
    name : string
    result : string
}