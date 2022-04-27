export const CHANGE_VALUE = "CHANGE_VALUE";

export const changeValue = (value, name) => {
    console.log('action', value, name)
    return ({
    type : CHANGE_VALUE,
    value,
    name
})}