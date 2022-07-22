
export const CHANGE_VALUE = "CHANGE_VALUE";
export const COUNT = "COUNT";
export const SEND_FORM_CONNEXION = "SEND_FORM_CONNEXION";
export const SEND_FORM_REGISTER = "SEND_FORM_REGISTER";
export const SEND_FORM_REGISTER_CHILDREN = "SEND_FORM_REGISTER_CHILDREN";
export const EMPTY_FIELDS = "EMPTY_FIELDS";
export const CHANGE_LOADING = "CHANGE_LOADING";
export const CHANGE_MESSAGE_REQUEST= "CHANGE_MESSAGE_REQUEST";
export const VALIDATION_CODE = "VALIDATION_CODE";
export const SENT_NEW_LINK = "SENT_NEW_LINK";
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"
export const FIND_ALL_DATA = "FIND_ALL_DATA"
export const SET_ALL_DATA = "SET_ALL_DATA";
export const SET_ROLE = "SET_ROLE";
export const VERIFY_TOKEN = "VERIFY_TOKEN";
export const IS_CONNECT = "IS_CONNECT";
export const CHANGE_DISPLAY = "CHANGE_DISPLAY"
export const SENT_EXERCICES  = "SENT_EXERCICES" 
export const SET_RESPONSE_NEW_VALUE = "SET_RESPONSE_NEW_VALUE"
export const SENT_RESULT_EXERCICES  = "SENT_RESULT_EXERCICES" 
export const SAVE_RESULT = "SAVE_RESULT"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const SET_CATEGORIES = "SET_CATEGORIES"
export const BEGIN = "BEGIN"
export const SENT_AVERAGE = "SENT_AVERAGE"
export const SET_TIMER = "SET_TIMER"
export const SET_MINUTE = "SET_MINUTE"
export const SET_SECONDE = "SET_SECONDE"
export const SENT_ASK_PASSWORD = "SENT_ASK_PASSWORD"

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

export const sendFormRegisterChildren = () => ({
  type: SEND_FORM_REGISTER_CHILDREN
})

export const emptyFields = () => ({
  type: EMPTY_FIELDS
})

export const changeLoading = () => ({
  type: CHANGE_LOADING
})

export const changeMessageRequest = (value, status) => ({
  type: CHANGE_MESSAGE_REQUEST,
  value,
  status,
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

export const deleteUser = () => ({
  type: DELETE_USER
})

export const findAllData = () => ({
  type: FIND_ALL_DATA
})

export const setAllData = (data) => ({
  type: SET_ALL_DATA,
  data
})

export const setRole = (value) => ({
  type : SET_ROLE,
  value
})

export const verifyToken = () => ({
  type : VERIFY_TOKEN
})

export const isConnect = (value) => ({
  type : IS_CONNECT, 
  value
})

export const changeDisplay = (name, value) => ({
  type: CHANGE_DISPLAY, 
  name, 
  value
})

export const sentExercices = (value) => ({
  type: SENT_EXERCICES,
  value
})
export const sentResultExercices = (value) => ({
  type: SENT_RESULT_EXERCICES,
  value
})

export const setResponseNewValue = (value) => ({
  type : SET_RESPONSE_NEW_VALUE,
  value
})
export const saveResult = (timerest, idChild, exam, category, note) => ({
  type : SAVE_RESULT,
  timerest, 
  idChild,
  exam,
  category,
  note
})

export const getCategories = () => ({
  type : GET_CATEGORIES
})

export const setCategories = (value) => ({
  type : SET_CATEGORIES,
  value
})

export const begin = () => ({
  type: BEGIN
})

export const sentAverage = (value) => ({
  type: SENT_AVERAGE,
  value
})


export const setMinute = (value) => ({
  type : SET_MINUTE,
  value
})
export const setSeconde = (value) => ({
  type : SET_SECONDE,
  value
})

export const sentAskPassword = (value) => ({
  type : SENT_ASK_PASSWORD,
  value
})
