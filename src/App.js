import './App.css';
import {Routes,Route,useNavigate,Navigate} from "react-router-dom";
import React from 'react';
import {Container} from './layout';
import Login from './views/Login';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
function App() {
  const {pathname,search} = useLocation()
  const {user_email} = useSelector(state => state.auth)
  const navigate = useNavigate();

  React.useEffect(()=>{
    if(user_email===''){
      navigate(`${pathname}${search}`)  
    }

  },[user_email,navigate,pathname,search])

  return (
    <div>
      <ToastContainer/>
      <Routes>
          <Route exact path='/auth' element={user_email === '' ? <Login/> : <Navigate to='/'/>}/>
          <Route path='*' element={user_email === '' ? <Login/> : <Container/>}/>
      </Routes>
    </div>
  );
}

export default App;
