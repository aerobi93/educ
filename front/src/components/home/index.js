import React,  { useEffect }from "react";
		
import Spinner from "../loader/spin";

const Home = ({ findAllData, changeLoading, loading }) => {
  
	useEffect(() => {
		changeLoading()
		findAllData()
	})

	return (
		<div className="home">
			{loading && <div className="form__loading"><Spinner /></div>}
		</div>
	)
}
export default Home