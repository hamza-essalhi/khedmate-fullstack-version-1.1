import {Navigate,Outlet} from 'react-router-dom'
const AuthRoute = () => {
    const {user}=true
    return user ? <Navigate to='/' replace/> : <Outlet/>
}
 
export default AuthRoute;