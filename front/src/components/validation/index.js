import React, { useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import "./styles.scss";

import Spinner from "../loader/spin";

const Validation = ({ loading, changeLoading, validationCode}) => {
  const params = useParams()
  const navigate = useNavigate()
  const cut = params.id.split('&')
  let now = new Date()


  now = Math.floor(now.getTime()/1000)
    if (now > +cut[1] + (60 * 15)) {
      navigate('/403')
    }
 
   useEffect(() => {
    changeLoading()
    validationCode(params.id)
    },[])

  return (
    <>
      {
        loading && 
        <div className="validation">
          <h2 className="validation__title"> Validation en cour</h2>
          <div className="validation__loader">
              <Spinner />
          </div>  
        </div>
      }
    </>
  )
}
export default Validation