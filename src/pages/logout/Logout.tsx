import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../store/AuthSlice"
import styles from './Logout.module.css'
const Logout = ()=>{
    const dispatch = useDispatch();
    /** handle logout function using redux */
    const handleLogout = ()=>{
        dispatch(logout())
    }
    return(
        <div className={styles.logout}>
        <h2>Do You Sure You Want To Logout</h2>
        <Button onClick={handleLogout} variant="outlined">
            Submit
        </Button>
        </div>
    )
}

export default Logout