const Result  = ({ data, role }) => {
  return (
		<div className= "account__result--container">
			<div className= "account__result--name">
				{role === "student" ? "mes resultats" : `les resultats de ${data.name}` }
			</div>
		</div>
	)

}
export default Result