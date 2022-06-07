import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Grid,Paper,Typography,Button} from '@mui/material';

import Toolbar from '../../../components/toolbar/Toolbar';
import Spinner from '../../../components/spinner/spinner'; 
import {Label} from '../../../components/labels';
import {SimpleTable} from '../../../components/table'

import AddRoleDialog from './AddRoleDialog';
import EmployeeDialog from './EmpDialog';

import {getData} from '../../../store/data-management';


function UpdateProject() {
  let params = useParams();   
  const {loading} = useSelector(state => state.dataManagement);
  const dispatch = useDispatch();
  const [header,setHeader] = React.useState({
    project_code: null,      
    project_name:null,
    project_type:null,
    project_sponsor:null,
    project_customer:null,
    project_bu:null,
    project_objective:null,
    project_scope:null,
    project_out_scope:null,
    project_go_live:null,
    project_priority:null,
    project_post_code:null,
    project_service_type:null
  })

  const [state,setState] = React.useState({
    role_id:null,
    resource_id:null
  })

  const [roles,setRoles]                  = React.useState([]);
  const [addRoleDialog,setAddRoleDialog]  = React.useState(false);
  const [empDialog,setEmpDialog]          = React.useState(false);

  const columns = React.useMemo(()=>[
    {
      Header:'Role Name',
      accessor:'role_name'
    },
    {
      Header:'Role Desc',
      accessor:'role_description'
    },
    {
      Header:'Service Catalog',
      accessor:'cat_name'
    },
    {
      Header:'Is Active',
      accessor:'is_active',
      Cell: props => {
        return props.value === 1 ? 'true' : 'false'
      }
    },
    {
      Header:'Action',
      Cell:props => {
        const handleClick = () => {
          const cell = props.row.original
          // console.log(cell)
          setState({
            ...state,
            role_id:cell.project_role,
            resource_id:cell.id
          })

          toggleEmpDialog()
        }
        return <Button size='sm' onClick={handleClick}>
          Details
        </Button>
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[])

  const toggleRoleDialog = () => {
    setAddRoleDialog(!addRoleDialog)
    if(addRoleDialog){
      getProjects()
    }
  }

  const toggleEmpDialog=()=>{
    setEmpDialog(!empDialog)
  }

  const getProjects = () => {
    const project_code = params.project_code
    dispatch(getData({
      route:`project-code/${project_code}`,
    }))
    .unwrap()
    .then(result => {
      setHeader({
        ...result.project
      })

      setRoles(result.project.project_roles)
    })
  }
  React.useEffect(()=>{
    getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item md={12} xs={12}>
        <Toolbar label='Service Catalog Details' isBack/>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={12}><Typography variant='button'>Project Header</Typography></Grid>
            <Label  size={4}        label='Project Code'           value={header.project_code}/>
            <Label  size={4}        label='Project Name'           value={header.project_name}/>
            <Label  size={4}        label='Project Type'           value={header.project_type}/>

            <Label  size={4}        label='Project Sponsor'        value={header.project_sponsor}/>
            <Label  size={4}        label='Department Owner'       value={header.project_bu}/>
            <Label  size={4}        label='Customer'               value={header.project_customer}/>

            <Label  size={4}        label='Service Type'           value={header.project_service_type}/>
            <Label  size={4}        label='Go Live Date'           value={header.project_go_live}/>
            <Label  size={4}        label='Project Post Code'      value={header.project_post_code}/>
                            
            <Label  size={4}        label='Priority'               value={header.project_priority}/>
            <Label  size={4}        label='Project Objective'      value={header.project_objective}/>
            <Label  size={4}        label='Project Scope'          value={header.project_scope}/>
            
            <Label  size={4}        label='Project Out of Scope'   value={header.project_type}/>
          </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={6}><Typography variant='button'>Project Resouces</Typography></Grid>
          <Grid item xs={6} sx={{display:'flex',marginTop:1}}> 
            <div style={{flexGrow:1}}/>
            <Button variant='contained' onClick={toggleRoleDialog}>Add Resource</Button>
          </Grid>
          <Grid item xs={12} sx={{marginTop:1}}> 
            <SimpleTable
              data={roles}
              columns={columns}
              size={12}
            />
          </Grid>
            
        </Grid>
      </Grid>
      <AddRoleDialog  isOpen={addRoleDialog}  toggle={toggleRoleDialog} project_code={params.project_code}/>
      <EmployeeDialog isOpen={empDialog}      toggle={toggleEmpDialog}  project_code={params.project_code} resource_id={state.resource_id} role_id={state.role_id}/>
    </Grid>
  )
}

export default UpdateProject