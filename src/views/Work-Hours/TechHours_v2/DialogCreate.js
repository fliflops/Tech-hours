import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {toast}          from 'react-toastify';
import moment           from 'moment';

import {MasterSelect} from '../../../components/select';
import {Input,DatePicker,Numeric} from '../../../components/inputs';
import {Label} from '../../../components/labels';
import Spinner from '../../../components/spinner';

import {getData,createData} from '../../../store/work-hours';
import {useNull} from '../../../helpers'

const DialogCreate = ({
    isOpen,
    toggle,
    trigger
}) => {

    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.workHours)
    const [hasNull] = useNull();
    
    const [state,setState] = React.useState({
        project_code:null,
        service_catalog:null,
        l2_service_catalog:null,
        l3_service_catalog:null,
        role:null,
        planned_date:null,
        planned_duration: 0,
        remarks:null,
        available_hrs:0
    })

    const handleSelectChange = (value,name) => {
        setState({
            ...state,
            [name]:value
        })
    }

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleConfirm = () => {
        const {l2_service_catalog,remarks,available_hrs,...required} = state;
        const nulls = hasNull(required)

        if(nulls.length > 0){
            return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
        }

        if(!state.planned_duration || state.planned_duration < 0){
            return toast.error(`Planned duration required!`)
        }

        // if(!available_hrs || available_hrs <= 0){
        //     return toast.error(`You don't have available working hours for this date`)
        // }

        dispatch(createData({
            route:'',
            data:{
                project_code:       state.project_code.value,
                role_id:            state.role.value,
                service_catalog:    state.service_catalog.value,
                l2_catalog:         state.l2_service_catalog?.value || null,
                l3_catalog:         state.l3_service_catalog,
                planned_date:       moment(state.planned_date).format('YYYY-MM-DD'),
                planned_duration:   state.planned_duration,
                remarks:            state.remarks
            }
        }))
        .unwrap()
        .then(result=> {
            setState({
                ...state,
                project_code:null,
                service_catalog:null,
                l2_service_catalog:null,
                l3_service_catalog:null,
                role:null,
                planned_date:null,
                planned_duration: 0,
                remarks:null,
                available_hrs:0
            })

            trigger()
        })
    }

    //get role info
    React.useEffect(()=>{
        if(state.service_catalog){
            dispatch(getData({
                route:`role/${state.project_code?.value}`,
                filters:{
                    project_service_catalog: state.service_catalog?.value 
                }
            }))
            .unwrap()
            .then(result => {
                const data = result.data?.employee_role
                
                setState({
                    ...state,
                    role:{
                        label:data.role_name,
                        value:data.role_id
                    }
                })
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.service_catalog])


    React.useEffect(()=>{
        if(!state.project_code){
            setState({
                ...state,
                service_catalog:null,
                l2_service_catalog:null
            })
        }

        if(!state.service_catalog){
            setState({
                ...state,
                l2_service_catalog:null
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.project_code,state.service_catalog])

    // React.useEffect(()=>{
    //     if(state.planned_date){
    //         dispatch(getData({
    //             route:'time',
    //             filters:{
    //                 planned_date:moment(state.planned_date).format('YYYY-MM-DD')
    //             }
    //         }))
    //         .unwrap()
    //         .then(result => {
    //             setState({
    //                 ...state,
    //                 available_hrs:result.available_time
    //             })
    //         })
    //     }
    //     else{
    //         setState({
    //             ...state,
    //             available_hrs:0
    //         })
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[state.planned_date])

    return (
    <Dialog fullWidth maxWidth='md' open={isOpen}>
        <Spinner loading={loading}/>
        <DialogTitle>Create Tech Hours</DialogTitle>
        <DialogContent dividers>
            <Grid container>
                <Grid item xs={6}>
                    <MasterSelect label='Project Codes' name='project_code' type='project' value={state.project_code} handleChange={handleSelectChange}/>
                </Grid>
                <Grid item xs={6}>
                    <Label label='Role' value={state.role?.label} size={12}/>
                </Grid>
                <Grid item xs={6}>
                    <MasterSelect label='Service Catalog' name='service_catalog' type={`service-catalog/${state.project_code?.value}`} value={state.service_catalog} handleChange={handleSelectChange} isDisabled={!state.project_code}/>
                </Grid>
                <Grid item xs={6}>
                    <MasterSelect label='L2 Service Catalog' name='l2_service_catalog' type={`service-catalog-l2/${state.service_catalog?.value}`} value={state.l2_service_catalog} handleChange={handleSelectChange} isDisabled={!state.service_catalog}/>
                </Grid>
                <Grid item xs={12}>
                    <Input label='L3 Service Catalog'   name='l3_service_catalog' size={12} value={state.l3_service_catalog} handleChange={handleInputChange} isMultiline isLabelVisible/>
                </Grid>
               
                <DatePicker label='Planned Date'        name='planned_date'     value={state.planned_date}     handleChange={handleInputChange} size={6} isLabelVisible/>
                <Numeric    label='Planned Duration'    name='planned_duration' value={state.planned_duration} handleChange={handleInputChange}  size={3} isLabelVisible/>
                {/* <Label label='Available Time' value={`${state.available_hrs} HR/S`} size={3}/> */}
                    
                <Grid item xs={12}>
                    <Input label='Remarks' name='remarks' size={12} value={state.remarks} handleChange={handleInputChange} isMultiline isLabelVisible/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
            <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
        </DialogActions>
    </Dialog>    
  )
}

export default DialogCreate