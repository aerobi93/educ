useEffect(() => {
    changeLoading()
      findAllData()
    console.log("use effect finddata")
  },data)
  
  useEffect(() => {
    if(name.trim() !=="") { setErrorName(false)}
    if(birthday.trim() !== "") {setErrorBirthday(false)}
    console.log(birthday)
  }, name, birthday)


  const [displayFormAdd, setDisplayFormAdd] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorBirthday, setErrorBirthday] = useState(false)

  const handlerSubmit = (evt) => {
    evt.preventDefault()
    if(name.trim() =="") { setErrorName(true); return }
    if(birthday.trim() =="") { setErrorBirthday(true); return }
    sendFormRegister()
  }

    return (
        <div className="home">
            {loading && <div className="form__loading"><Spinner /></div>}
      {
        (data && role === "parent") && 
        <div className={displayFormAdd ? `home__addchiled--on` : `home__addchiled--off` } onClick={() => setDisplayFormAdd(!displayFormAdd)}> 
          ajouter un enfant 
        </div>
      }
      {displayFormAdd && <form onSubmit={(evt) => {handlerSubmit(evt)}} className="home__form">
        <Input 
          ico={faUser} 
          id={"name"}
          value={name}
          placeholder={"prenom"}
          type={"text"}
          className={errorName ? 'form__input form__input--red' : 'form__input'}
        />
        <Input 
          ico={faCakeCandles}
          id={"birthday"}
          value={birthday}
          className={ errorBirthday ? "form__input form__input--red" : "form__input" }
          type={"date"}
          placeholder={"date de naissance"} 
      />
        <button className="form__submit">enregistrer</button>
        </form>
      }
      
     
        </div>
    
    )
}