import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import Spinner from "../loader/spin";

const Validation = ({ loading, changeValidation }) => {
  const params = useParams()
  useEffect(()=> {
    changeValidation(params.id)
  }, [])
  return (
    <>
      { !loading && 
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