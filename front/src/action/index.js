export const CHANGE_VALUE = "CHANGE_VALUE";
export const SEND_FORM_CONNEXION = "SEND_FORM_CONNEXION";
export const SEND_FORM_REGISTER = "SEND_FORM_REGISTER";
export const EMPTY_FIELDS = "EMPTY_FIELDS";
export const CHANGE_ERROR_FIELDS = "CHANGE_ERROR_FIELDS";
export const CHANGE_LOADING = "CHANGE_LOADING";
export const CHANGE_VALIDATION = "CHANGE_VALIDATION";

export const changeValue = (value, name) => ({
    type: CHANGE_VALUE,
    value,
    name
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

export const changeErrorFields = () => ({
    type: CHANGE_ERROR_FIELDS
})

export const changeLoading = () => ({
    type: CHANGE_LOADING
})

export const changeValidation = (value) => ({
    type: CHANGE_VALIDATION,
    value
})