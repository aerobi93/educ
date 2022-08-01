import react, { useEffect } from "react"
import { useState } from "react"


const Result  = ({ data, role, changeValue, childId, displayResultExercices, changeDisplay, allCategories, getCategories, sentAskPassword}) => {

  const [categories, setCategories] = useState("all")
  const [SliceresultExercices, setSliceExercices] = useState()
  const [toogleExam, setToogleExam] = useState(true)

  useEffect(() => {
    if(!allCategories) {
       getCategories()
    }
   
  }, [])

  useEffect(() => {
    let resultExamChild = []
    let resultExercicesChild = []
    data.results.map((element) => {
      if (categories === "all") {
        element.exam === true ? 
          resultExamChild.push(element) : 
          resultExercicesChild.push(element) 
      }
      else {
        if(element.content.name === categories) {
          element.exam === true ? 
          resultExamChild.push(element) : 
          resultExercicesChild.push(element)
        }
      }
    })
    toogleExam ? setSliceExercices(resultExamChild.reverse().slice(0,10)) :  setSliceExercices(resultExercicesChild.reverse().slice(0, 10))
  }, [categories, toogleExam, data])



  const handlerChange = (evt) => {
    setCategories(evt.target.value)
  }
  return (
		<div className= "account__result--container">
			<div className= "account__result--name" onClick={() => {
        childId ? sentAskPassword({id : data.id}) :  changeValue(data.id, "childId")}}>
				{role === "student" ? "mes resultats" : `voir le profil de ${data.name}` }
			</div>

      {childId === data.id  && <div className= "account__result--container">
       <div className="account__result--link"  onClick={() => sentAskPassword("deleteChild")}>supprime le compte de {data.name}</div>
        <div 
          className={`account__result--link ${displayResultExercices ? "account__result--open" : "account__result--close"}`}
          onClick={() => changeDisplay("displayResultExercices", !displayResultExercices)}
        >
          voir les resultats des derniere exercices
        </div>
        {
          (allCategories && displayResultExercices) && 
            <>
            <select className="account__result--select" onChange={(evt) => {handlerChange(evt)}}>
              <option value="all">tous les resultat</option> 
            {
              allCategories.map((element) => 
                <option key={element.id} value={element.name} >{element.name}</option> 
              )
            }
            </select>
            <table className="account__result--flexRow">
              <tbody>
                  <tr>
                <th colSpan = "2" className="account__result--toogleExam" onClick={() => setToogleExam(true)}> resultats d'examen</th>
                <th colSpan="2" className="account__result--toogleExam" onClick={() => setToogleExam(false)}> resultats au exercices</th>
              </tr>
              </tbody>
            
             { SliceresultExercices &&  SliceresultExercices.length > 0 &&  
             <tbody>
             <tr>
                <th>date</th> 
                <th>matiére</th>
                <th>temp mis</th>
                <th>note</th>
              </tr>
                {
                  SliceresultExercices &&  SliceresultExercices.map((element, index) =>  {
                    let newDate  = new Date(element.date)
                    return (
                      <tr key={index}>
                        <td>{'le ' + newDate.getUTCDate() + "/"+ newDate.getMonth() + "/" + newDate.getFullYear()}</td>
                        <td>{element.content.name}</td>
                        <td>{element.timeRest}</td>
                        <td className={element.note > 10 ? "account__note--green" : "account__note--red"}>{element.note}</td>
                      </tr>
                    )
                  })
                  } 
                  
                  </tbody>
                }
             {SliceresultExercices &&  SliceresultExercices.length == 0 && <tr><td colSpan="4" > aucun resultat</td></tr>} 
            </table>

            </>
        }
        
       
		  </div>
    }
    </div>
	)

}
export default Result