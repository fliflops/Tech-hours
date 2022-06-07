import React from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Grid,Paper,Typography,Button} from '@mui/material';
import { toast } from 'react-toastify';

import {getRole,createRole} from '../../../store/role/role.slice';
import Spinner from '../../../components/spinner/spinner'; 
import {Label} from '../../../components/labels';
import Toolbar from '../../../components/toolbar/Toolbar';
import {MasterSelect} from '../../../components/select';
import {SimpleTable} from '../../../components/table';
import Switch from '../../../components/switch/Switch';


function RoleDetails() {
  let params = useParams(); 
  let navigate = useNavigate();
  const {loading} = useSelector(state => state.role);
  const dispatch = useDispatch();
  const [state,setState] = React.useState({
    role_id:null,
    role_name:null,
    role_description:null,
    role_status:null
  })

  const [roleDetails,setRoleDetails] = React.useState({
    nyx_user:null,
  })
  const [details,setDetails] = React.useState([])

  const columns = React.useMemo(()=>[
    {
      Header:'Employee Email',
      accessor:'user_email'
    },
    {
      Header:'Is Primary',
      accessor:'is_primary',
      Cell:props =>{
        const handleChange = (e) => {
          let data = [...details]
          data[props.row.index]['is_primary'] = e.target.checked 
          setDetails(data)
        }

        return (
          <div>
            {
              props.row.original.is_edit ? <Switch checked={props.value} handleChange={handleChange}/> :
              <label>{props.value ? 'true':'false'}</label> 
            }
          </div>
          
        )
      }
    },
    {
      Header:'Is Active',
      accessor:'is_active',
      Cell:props =>{
        const handleChange = (e) => {
          let data = [...details]
          data[props.row.index]['is_active'] = e.target.checked 
          setDetails(data)
        }

        return (
          <div>
          {
            props.row.original.is_edit ? <Switch checked={props.value} handleChange={handleChange}/> :
            <label>{props.value ? 'true':'false'}</label> 
          }
        </div>
        )
      }
    },
    {
      Header:'Action',
      Cell:props => {
        const handleEdit = () => {
          let data = [...details]
          data[props.row.index]['is_edit']=!props.row.original.is_edit 
          setDetails(data)
        }

        return <div style={{
          width:'100%',
          display:'flex',
          justifyContent:'center'
        }}>
          <Button size='small' onClick={handleEdit}>
            {props.row.original.is_edit ? 'SAVE' : 'EDIT'}
          </Button>
        </div>
      }
    }
  ],[details])

  const handleSelectChange = (e,name) => {
    setRoleDetails({
        ...roleDetails,
        [name]:e
    })
  }

  const handleAddEmployee = () => {

    if(!roleDetails.nyx_user){
      return toast.error('Select an email first!')
    }

    setDetails(details.concat({
      role_id: state.role_id,
      // role_type: roleDetails.role_type?.value || null,
      // role_name:roleDetails.role_type?.label || null,
      user_email: roleDetails.nyx_user?.label || null,
      emp_id: roleDetails.nyx_user?.value || null,
      is_active:true,
      is_primary:false,
      is_edit:false
    }))
  }

  const handleConfirm = () => {

    if(details.length === 0){
      return toast.error('No selected employees')
    }
    dispatch(createRole({
      route:'details',
      data:details.map(item => {
        const {user_email,...newItem} = item
        return newItem
      })
    }))
  }

  React.useEffect(()=>{
    const role_id = params.role_id
    
    dispatch(getRole({
      route:`${role_id}`
    }))
    .unwrap()
    .then(result => {
        if(result.data){
          setState({
            ...state,
            role_id:result.data.role_id,
            role_name:result.data.role_name,
            role_description:result.data.role_description,
            role_status:result.data.role_status
          })

          setDetails(result.details)
        }
        else{
          navigate('/administration/roles')
        }
    })
        
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params,navigate])

  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item md={12} xs={12}>
        <Toolbar label='Role Details' isBack/>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={12}><Typography variant='button'>Employee Information</Typography></Grid>
          <Label
            size={4}
            label='Role Name'
            value={state.role_name}
          />
          <Label
            size={4}
            label='Role Description'
            value={state.role_description}
          />
          <Label
            size={4}
            label='Role Status'
            value={state.role_status}
          />
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={12}><Typography variant='button'>Role Details</Typography></Grid>
          <Grid item md={6} xs={12}>
            <MasterSelect 
              label='Email'
              type='employee'
              name='nyx_user' 
              value={roleDetails.nyx_user}
              handleChange={handleSelectChange}
            />
          </Grid>
          <Grid item md={12} sx={{marginTop:1,marginBottom:1,display:'flex'}}>
            <div style={{flexGrow:1}}/>
            {/* <Button variant='contained' color='secondary'>Cancel</Button> */}
            <Button variant='contained' color='primary' onClick={handleAddEmployee}>Add</Button>
            <Button variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
            
          </Grid>
          <SimpleTable size={12} data={details} columns={columns}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RoleDetails