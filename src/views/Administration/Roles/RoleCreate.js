import React from 'react'
import {Grid,Paper,Typography,Button}     from '@mui/material'; 
import {toast}          from 'react-toastify';
import {useSelector,useDispatch}               from 'react-redux';
import Toolbar          from '../../../components/toolbar';
import {Input}          from '../../../components/inputs';
import {Label}               from '../../../components/labels';
import {useNull}          from '../../../helpers'
import {createRole}               from '../../../store/role';
import Spinner          from '../../../components/spinner'; 


function RoleCreate() {
  // const {useNull} = hooks;
    const [hasNull] = useNull();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.role)
    const [state,setState] = React.useState({
      role_name:null,
      role_description:null,
    })

    const [controls,setControls] = React.useState({
      isCreated:false,
      status:''    
    })

    const handleInputChange = (e) => {
      setState({
          ...state,
          [e.target.name]:e.target.value
      })
    } 

    const handleNew = () => {
      setControls({
        ...controls,
        isCreated:false,
        status:''
      })

      setState({
        ...state,
        role_name:null,
        role_description:null
      })
    }

    const handleConfirm = () => {
      const nulls = hasNull(state)
      if(nulls.length > 0){
        return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
      }

      dispatch(createRole({
        route:'',
        data:{
          ...state
        }
      }))
      .unwrap()
        .then(()=> {
            setControls({
                ...controls,
                isCreated:true,
                status:'ACTIVE'
            })
        })
    }



  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item md={12} xs={12}>
        <Toolbar label='Create Role' isBack/>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={12}><Typography variant='button'>Employee Information</Typography></Grid>
          <Input isLabelVisible label='Role Name'    handleChange={handleInputChange}          value={state.role_name}        name='role_name'/>
          <Input isLabelVisible label='Role Description'    handleChange={handleInputChange}        value={state.role_description}        name='role_description'/>
          <Label size={3} label='Status' value={controls.status}/>        
          <Grid item md={12} sx={{
                        marginTop:1,
                        display:'flex'
                    }}>
                        <div style={{flexGrow:1}}/>
                        <Button sx={{display: controls.isCreated ? 'visible':'none'}}  variant='contained' color='primary' onClick={handleNew}>New</Button>
                        <Button disabled={controls.isCreated} variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
          </Grid>
        </Grid>        
      </Grid>
    </Grid>
  )
}
 
export default RoleCreate