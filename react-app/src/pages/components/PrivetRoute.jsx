import { useSelector } from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom'
const PrivetRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated? <Outlet/> :  <Navigate to='/login' replace/>
}
 
export default PrivetRoute;