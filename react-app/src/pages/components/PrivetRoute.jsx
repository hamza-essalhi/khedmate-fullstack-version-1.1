import {Navigate,Outlet} from 'react-router-dom'
const PrivetRoute = () => {
    const user=true
    return user ? <Outlet/> :  <Navigate to='/login' replace/>
}
 
export default PrivetRoute;