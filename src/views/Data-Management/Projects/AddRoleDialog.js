import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux'

import Spinner from '../../../components/spinner/spinner'; 
import {MasterSelect} from '../../../components/select'
import {createData} from '../../../store/data-management';

function AddRoleDialog({
    isOpen,
	toggle,
    project_code
}) {
    const {loading} = useSelector(state => state.dataManagement);
    const dispatch = useDispatch()
    const [state,setState] = React.useState({
        project_role:null,
        project_service_catalog:null
    })
    const addToResource = () => {
        dispatch(createData({
            route:'project-code/role',
            data:{
                project_code,
                project_role: state.project_role?.value || null,
                project_service_catalog: state.project_service_catalog?.value || null
            }
        }))
        .unwrap()
        .then(()=>{
            toggle()
        })
    }

    const handleSelect = (e,name)=>{
        setState({
            ...state,
            [name]:e
        })
    }
  
    return (
    <Dialog fullWidth maxWidth='md' open={isOpen}>
        <Spinner loading={loading}/>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent dividers>
            <Grid container>
                <Grid item xs={6}>
                    <MasterSelect label='Role' type={'role'} name='project_role' value={state.project_role} handleChange={handleSelect}/>
                </Grid>
                <Grid item xs={6}>
                    <MasterSelect label='Service Catalog' type={'service-catalog'} name='project_service_catalog' value={state.project_service_catalog} handleChange={handleSelect}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='primary' onClick={addToResource}>Confirm</Button>
            <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddRoleDialog