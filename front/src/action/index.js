export const CHANGE_VALUE = "CHANGE_VALUE";
export const COUNT = "COUNT";
export const SEND_FORM_CONNEXION = "SEND_FORM_CONNEXION";
export const SEND_FORM_REGISTER = "SEND_FORM_REGISTER";
export const EMPTY_FIELDS = "EMPTY_FIELDS";
export const CHANGE_LOADING = "CHANGE_LOADING";
export const CHANGE_MESSAGE_REQUEST= "CHANGE_MESSAGE_REQUEST";
export const VALIDATION_CODE = "VALIDATION_CODE";
export const SENT_NEW_LINK = "SENT_NEW_LINK";
export const UPDATE_USER = "UPDATE_USER"
export const FIND_ALL_DATA = "FIND_ALL_DATA"
export const SET_ALL_DATA = "SET_ALL_DATA";


export const changeValue = (value, name) =>({
  type: CHANGE_VALUE,
  value,
  name
})
export const count = () => ({
  type: COUNT
})
export const sendFormConnexion = () => ({
  type: SEND_FORM_CONNEXION
})

export const sendFormRegister = () => ({
  type: SEND_FORM_REGISTER
})

export const emptyFields = () => ({
  type: EMPTY_FIELDS
})

export const changeLoading = () => ({
  type: CHANGE_LOADING
})

export const changeMessageRequest = (value, status, role) => ({
  type: CHANGE_MESSAGE_REQUEST,
  value,
  status,
  role
})


export const validationCode = (value) =>({
  type : VALIDATION_CODE,
  value
})

export const sentNewLink = (value) => ({
  type: SENT_NEW_LINK,
  value
})

export const updateUser = () => ({
  type : UPDATE_USER
})

export const findAllData = () => ({
  type: FIND_ALL_DATA
})

export const setAllData = (data) => ({
  type: SET_ALL_DATA,
  data
})
