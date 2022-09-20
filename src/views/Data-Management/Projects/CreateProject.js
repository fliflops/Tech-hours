import React from 'react';
import {Grid,Typography,Paper,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

import Toolbar from '../../../components/toolbar/Toolbar';
import {Input,DatePicker} from '../../../components/inputs';
import {Label} from '../../../components/labels';
// import Switch from '../../../components/switch/Switch';
import {MasterSelect} from '../../../components/select'
import Spinner from '../../../components/spinner';
import {createData} from '../../../store/data-management';
import {useNull} from '../../../helpers/hooks'


function CreateProject() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    const [hasNull] = useNull()
    const [header,setHeader] = React.useState({
        project_code:           null,      
        project_name:           null,
        project_type:           null,
        project_sponsor:        null,
        project_customer:       null,
        project_bu:             null,
        project_objective:      null,
        project_scope:          null,
        project_out_scope:      null,
        project_go_live:        null,
        project_planned_date:   null,
        project_priority:       null,
        project_service_type:   null       
    })

    const handleInputChange = (e) => {
        setHeader({
            ...header,
            [e.target.name]:e.target.value
        })
    }

    const handleSelectChange =(e,name)=>{
        setHeader({
            ...header,
            [name]:e
        })
    } 
    
    const handleConfirm = () => {

        const {
            project_code,
            project_bu,
            project_customer,
            project_service_type,
            project_go_live,
            project_objective,
            project_scope,
            project_out_scope,
            project_planned_date,
            project_sponsor,
            ...required
        } = header

        const nulls = hasNull(required)

        if(nulls.length > 0){
            return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
        }



        dispatch(createData({
            route:'project-code',
            data:{
                ...required,
                project_customer,
                project_service_type,
                project_go_live,
                project_objective,
                project_scope,
                project_out_scope,
                project_planned_date,
                project_sponsor,
                project_priority:header.project_priority?.value || null, 
                project_type: header.project_type?.value        || null,
            }
        })) 
        .unwrap()
        .then(result => {
            setHeader({
                ...header,
                project_code:result.project.project_code
            })
        }) 
    }

    return (
        <Grid container spacing={1}>
            <Spinner loading={loading}/>
             <Grid item md={12} xs={12}>
                <Toolbar label='Create Project Code' isBack/>
            </Grid>
            <Grid item md={12} xs={12}>
                <Grid component={Paper} container item variant='container' md={12}>
                    <Grid item xs={12}><Typography variant='button'>Project Information</Typography></Grid>
                    
                    <Label  size={3}        label='Project Code'           value={header.project_code}/>
                    <Input  size={6}        label='Project Name' isLabelVisible name='project_name' value={header.project_name} handleChange={handleInputChange}/> 
                    <Grid   item md={3}>
                        <MasterSelect       label='Project Type'        name='project_type'             value={header.project_type}             handleChange={handleSelectChange} type='quick-code' filter='PROJECT_TYPE' />
                    </Grid>  

                    <Input  size={3}        label='Project Sponsor'    name='project_sponsor'           value={header.project_sponsor}          handleChange={handleInputChange} isLabelVisible /> 
                    <Input  size={3}        label='Department Owner'   name='project_bu'                value={header.project_bu}               handleChange={handleInputChange} isLabelVisible /> 
                    <Input  size={3}        label='Customer'           name='project_customer'          value={header.project_customer}         handleChange={handleInputChange} isLabelVisible /> 
                    <Input  size={3}        label='Service Type'       name='project_service_type'      value={header.project_service_type}     handleChange={handleInputChange} isLabelVisible /> 
                    
                    <DatePicker size={4}    label='Go Live Date'       name='project_go_live'           value={header.project_go_live}          handleChange={handleInputChange} isLabelVisible/>
                    <DatePicker size={4}    label='Planned Start'      name='project_planned_date'      value={header.project_planned_date}     handleChange={handleInputChange} isLabelVisible/>
                    
                    <Grid item md={4}>
                        <MasterSelect       label='Priority'           name='project_priority'          value={header.project_priority}         handleChange={handleSelectChange} type='quick-code' filter='PROJECT_PRIO'/>
                    </Grid>  
                     
                    <Input  size={4}        label='Project Objective'       name='project_objective'    value={header.project_objective}        handleChange={handleInputChange} isLabelVisible isMultiline/>
                    <Input  size={4}        label='Project Scope'           name='project_scope'        value={header.project_scope}            handleChange={handleInputChange} isLabelVisible isMultiline/>
                    <Input  size={4}        label='Project Out of Scope'    name='project_out_scope'    value={header.project_out_scope}        handleChange={handleInputChange} isLabelVisible isMultiline/>
                    <Grid   item xs={12} sx={{display:'flex',marginTop:1}}> 
                        <div style={{flexGrow:1}}/>
                        {/* <Button variant='contained' onClick={toggleRoleDialog}>Add Role</Button> */}
                        <Button variant='contained' onClick={handleConfirm} disabled={header.project_code !== null ? true : false}>Confrim</Button>
                </Grid>
                </Grid>
            </Grid> 
        </Grid>

    )
}

export default CreateProject