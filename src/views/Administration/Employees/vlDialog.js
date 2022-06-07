import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {toast} from 'react-toastify';
import moment from 'moment';

import {DatePicker,Input} from '../../../components/inputs'
import {hooks} from '../../../helpers'



function VLDialog({
    isOpen,
	toggle,
    handleAdd
}) {

    const {useNull} = hooks;
    const [hasNull] = useNull()

    const [state,setState] = React.useState({
        vl_reason:null,
        vl_date_from:null,
        vl_date_to:null
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const add = () => {
        const nulls = hasNull(state)

        if(nulls.length > 0){
            return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
     
        }

        if(moment(state.vl_date_from) > moment(state.vl_date_to)){
            return toast.error('Invalid date range')
        }

        handleAdd({
            ...state,
            vl_date_from:moment(state.vl_date_from).format('YYYY-MM-DD'),
            vl_date_to:moment(state.vl_date_to).format('YYYY-MM-DD')
        })

        setState({
            ...state,
            vl_date_from:null,
            vl_date_to:null,
            vl_reason:null
        })
    }

    return (
        <Dialog fullWidth maxWidth='md' open={isOpen}>
        {/* <Spinner loading={loading}/> */}
        <DialogTitle>VL Details</DialogTitle>
        <DialogContent dividers>
            <Grid container>
                <DatePicker
                    size={4}
                    label='VL From'
                    value={state.vl_date_from}
                    name='vl_date_from'
                    handleChange={handleChange}
                    isLabelVisible
                />
                <DatePicker
                    size={4}
                    label='VL To'
                    value={state.vl_date_to}
                    name='vl_date_to'
                    handleChange={handleChange}
                    isLabelVisible
                />

                <Input
                    size={4}
                    label='Reason'
                    value={state.vl_reason}
                    name='vl_reason'
                    handleChange={handleChange}
                    isLabelVisible
                />

                {/* <Grid item xs={6}>
                    <MasterSelect label='Role' type={'role'} name='project_role' value={state.project_role} handleChange={handleSelect}/>
                </Grid>
                <Grid item xs={6}>
                    <MasterSelect label='Service Catalog' type={'service-catalog'} name='project_service_catalog' value={state.project_service_catalog} handleChange={handleSelect}/>
                </Grid> */}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='primary'   onClick={add}>Confirm</Button>
            <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
        </DialogActions>
    </Dialog>
    )
}

export default VLDialog