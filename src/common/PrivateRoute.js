import { Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux';

function PrivateRoute({children}) {
  const {isLoggedIn} = useSelector(state=>state.auth);
  const hasToken = localStorage.getItem('token');
  
  return (isLoggedIn || hasToken) ? children : <Navigate to='/login' />;
}

export default PrivateRoute;