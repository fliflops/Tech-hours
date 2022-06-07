import React from 'react';
import {Paper,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import {useSearchParams,} from 'react-router-dom';
import {getUser,setAuth} from '../../store/auth';

function Login() {

    const [label,setLabel]  = React.useState('');
    const {user_email}      = useSelector(state => state.auth);
    const dispatch          = useDispatch();
    const [searchParams]    = useSearchParams();

    const handleClick = () => {
        window.location.replace(process.env.REACT_APP_NYX_LINK)
        //console.log(process.env.REACT_APP_NYX_LINK)
    }

    React.useEffect(()=>{
        const token = searchParams.get('token')
        // const expiry = searchParams.get('expiry')
        
        if(token){
            setLabel('REDIRECTING...')
            dispatch(setAuth({
                token
            }))

            dispatch(getUser({
                route:'details',
                filters:{
                    user_email:'velindayag@codedisruptors.com'
                }
            }))
        }
        else{
            setLabel('NO ACCESS!')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchParams])

    return (
        <Paper variant='outlined' 
            sx={{
               position:'absolute',
               top:'50%',
               left:'50%',
               minWidth:'200px',
               minHeight: '200px',
               transform:'translate(-50%,-50%)',
               padding:'20px',           
        }}>
           <div style={{
               display:'flex',
               flexDirection:'column',
               minHeight:'inherit'
           }}>
               <label style={{
                   flexGrow:1,
                   alignSelf:'center'
               }}>{label}</label>
               {user_email === '' ? 
               <Button onClick={handleClick}>Back to Login</Button> : null} 
           </div>
        </Paper>
  )
}

export default Login