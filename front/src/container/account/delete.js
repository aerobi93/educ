import { connect } from "react-redux";
import Delete from "../../components/account/delete";
import { changeLoading, deleteUser } from "../../action";


const mapStatetoProps = () => ({})

const mapDispatchtoProps = (dispatch) => ({
    deleteUser : () => {
        dispatch(deleteUser())
    },
    changeLoading : () => {
        dispatch(changeLoading())
    }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Delete)