import React from 'react'
import {
    Menu, 
	MenuItem,
} from '@mui/material';
import {useDispatch} from 'react-redux';
import {signOut} from '../../../store/auth'

function UserMenu({anchorEl,open,handleClose}) {
    const [openModal,setModal] = React.useState(false);
    const [dialog,setDialog] = React.useState(false);
    const [trigger,setTrigger] = React.useState(false);
    // const {user_email} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleSignOut =() => {
      dispatch(signOut())
    }


    const toggleChangePassword = () => {
      handleClose()
      setModal(!openModal);
      setDialog(!dialog)

      if(dialog===true){
        setTrigger(!trigger)
      }
	  }
  return (
    <div>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={toggleChangePassword}>Change Password</MenuItem>
				<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
			</Menu>
			{/* <ChangePasswordDialog user_email={user_email} isOpen={dialog} toggle={()=>{ toggleChangePassword()}} /> */}
		</div>
  )
}

export default UserMenu