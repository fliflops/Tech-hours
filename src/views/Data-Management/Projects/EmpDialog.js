import React from 'react';
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';


import Spinner from '../../../components/spinner/spinner'; 
import {MasterSelect} from '../../../components/select'
import {SimpleTable} from '../../../components/table';
import {getData,createData} from '../../../store/data-management';


function EmpDialog({
    isOpen,
	toggle,
    role_id,
    resource_id,
    project_code
}) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.dataManagement);
    const [employees,setEmployees] = React.useState([])
    const [state,setState] = React.useState({
        employee:null
    })
    const columns = React.useMemo(()=>[
        {
            Header:'Email',
            accessor:'emp_email'
        },
        {
            Header:'Status',
            accessor:'is_active',
            Cell:props => props.value === '1' ? 'ACTIVE' : 'INACTIVE'
        },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[employees])

    const onConfirm = ()=>{
        
        if(employees.length === 0){
            return toast.error('No Employee added!')
        }

        dispatch(createData({
            route:'projet-code/employee',
            data:employees.map(item => {
                const {emp_email,...data} = item
                
                return {
                    ...data
                }
            })
        }))
    }

    const onAdd=()=>{
        if(!state.employee){
            return toast.error('Please select an employee!')
        }

        if(employees.filter(item => item.emp_id === state.employee?.value).length > 0){
            return toast.error('Employee is already mapped!')
        }

        setEmployees(employees.concat({
            fk_resource_id: resource_id,
            emp_id:         state.employee?.value,
            emp_email:      state.employee?.label,
            project_role:   role_id,
            project_code:   project_code,
            is_active: 1
        }))

        setState({
            ...state,
            employee:null
        })
    }

    const handleSelect = (e,name) => {
        setState({
            ...state,
            [name]:e
        })
    }

    React.useEffect(()=>{
        if(!isOpen){
            setState({
                ...state,
                employee:null
            })
    
            setEmployees([])
        }
        else{
            
        dispatch(getData({
            route:`project-code/${resource_id}/employee`
        }))
        .unwrap()
        .then(result => {
            // console.log(result.data)
            setEmployees(result.data.map(item => {
                return {
                    fk_resource_id: item.fk_resource_id,
                    emp_id:         item.emp_id,
                    emp_email:      item.user_email,
                    project_role:   item.project_role,
                    project_code:   item.project_code,
                    is_active:      item.is_active
                }
            }))
        })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])

    return (  
       <Dialog fullWidth maxWidth='md' open={isOpen}>
        <Spinner loading={loading}/>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent dividers>
            <Grid container>
                <Grid item xs={10}>
                    <MasterSelect  label='Employees' type={'employee'} filter={role_id} name='employee' value={state.employee} handleChange={handleSelect}/> 
                </Grid>
                <Grid item xs={2} sx={{display:'flex',flexDirection: 'column'}}>
                    <Button variant='contained' onClick={onAdd} sx={{marginTop: 'auto'}}>Add</Button>
                </Grid>
                <Grid item xs={12} sx={{marginTop:1}}>
                    <SimpleTable size={12} data={employees} columns={columns}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='primary' onClick={onConfirm}>Confirm</Button>
            <Button variant='contained' color='secondary' onClick={toggle}>Close</Button>
        </DialogActions>
    </Dialog>
    )
}

export default EmpDialog