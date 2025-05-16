import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../store/AuthSlice"

const Logout = ()=>{
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(logout())
    }
    return(
        <>
        <h2>Do You Sure You Want To Logout</h2>
        <Button onClick={handleLogout} variant="outlined">
            Submit
        </Button>
        </>
    )
}

export default Logout