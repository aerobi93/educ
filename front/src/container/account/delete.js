import { connect } from "react-redux";
import Delete from "../../components/account/delete";
import { deleteUser } from "../../action";


const mapStatetoProps = () => ({})

const mapDispatchtoProps = (dispatch) => ({
    deleteUser : () => {
        dispatch(deleteUser())
    }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Delete)