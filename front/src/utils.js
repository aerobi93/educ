
export const   auth = async() => {
    let token = window.localStorage.getItem('token')
    if(!token) { console.log("no token"); return "no logged" }
    let reponse = fetch("http://localhost:7000/token/verifyToken", {
      method : "GET",
      headers : {
        "type" : 'JWT, json/application',
        token
      }
    })
    .then((response) => response.json())
    .then((response) => {
      return response.message}
    )
    .catch((err) => {return err})
    return  reponse
  }