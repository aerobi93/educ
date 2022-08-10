import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"


const Result  = ({widthWindow ,  data, role, changeValue, childId, displayResultExercices, displayResultExam, changeDisplay, allCategories, getCategories, sentAskPassword}) => {

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
      
        { widthWindow < 800 && childId &&
          <>
            <Link className= "account__menu--link  account__menu--red" to={`/account/exercise/simulation`} >s'entrainer</Link>
            <Link className= "account__menu--link  account__menu--red" to={`/account/exercise/exam`}>mode examen</Link>
          </>
        } 
        <div 
          className={`account__result--link ${displayResultExercices ? "account__result--open" : "account__result--close"}`}
          onClick={() => {
            changeDisplay("displayResultExercices", !displayResultExercices)
            changeDisplay("displayResultExam", false)
            setToogleExam(false)
          }}
        >
          voir les resultats des dernier exercices
        </div>

        <div 
          className={`account__result--link ${displayResultExam ? "account__result--open" : "account__result--close"}`}
          onClick={() =>{ 
            changeDisplay("displayResultExam", !displayResultExam)
            changeDisplay("displayResultExercices", false)
            setToogleExam(true)
          }}
        >
          voir les resultats des dernier examens
        </div>
        {
          (allCategories && (displayResultExercices || displayResultExam)) && 
            <>
            <select className="account__result--select" onChange={(evt) => {handlerChange(evt)}}>
              <option value="all" className="account__result--option">tous les resultat</option> 
            {
              allCategories.map((element) => 
                <option key={element.id} value={element.name} className="account__result--option"  >{element.name}</option> 
              )
            }
            </select>
            <table className="account__result--flexRow">
      
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
                        <td className={element.note > 10 ? "account__note account__note--green" : "account__note account__note--red"}>{element.note}</td>
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
         <div className="account__result--link account__result--delete"  onClick={() => sentAskPassword("deleteChild")}>supprime le compte de {data.name}</div>     
		  </div>
    }
    </div>
	)

}
export default Result