import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux';

import {MasterSelect,Select} from '../../../components/select';
import {Input,DatePicker}   from '../../../components/inputs';
import {Label}              from '../../../components/labels';
import Spinner from '../../../components/spinner';
import {createCalendar} from '../../../store/calendar'

function CreateCalendarDialog({
    isOpen,
	toggle
}) {

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.calendar)

    const [state,setState] = React.useState({
        calendar_type:null,
        date:null,
        description:null,
        holidays:null,
        type:null
    })

    const handleSelectChange = (e,name) => {
        setState({
            ...state,
            [name]:e
        })
    }

    const handleInputChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    const onConfirm = () => {
        let data = null

        if(state.type?.value === 'Others'){
            data = {
                holiday_date: state.date,
                holiday_name: state.description
            }
        }
        else if(state.type?.value === 'Holidays'){
            data = {
                holiday_date: state.holidays?.value,
                holiday_name: state.holidays?.label
            }
        }
       
        dispatch(createCalendar({
            route:'',
            data:data
        }))
        .unwrap()
        .then(() => {

        })
    }

    return (
        <Dialog fullWidth maxWidth='md' open={isOpen}>
            <DialogTitle>Add to Calendar</DialogTitle>
            <DialogContent dividers sx={{minHeight: '50vh',maxHeight: '50vh'}}>
            <Spinner loading={loading}/>
            <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <Select
                            label='Type'
                            type='calendar'
                            name='type'
                            value={state.type}
                            handleChange={handleSelectChange}
                        />
                    </Grid>
                    
                    <Grid container item xs={12} sx={{
                        display: state.type?.value === 'Holidays' ? 'visible' : 'none'
                    }}>
                        <Grid item xs={12}>
                            <MasterSelect
                                label='Holidays'
                                type='holidays'
                                name='holidays'
                                value={state.holidays}
                                handleChange={handleSelectChange}
                            />
                        </Grid>
                        
                        <Label
                            label={'Date'}
                            size={6}
                            value={state.holidays?.value || null}
                        />
                        <Label
                            label={'Name'}
                            size={6}
                            value={state.holidays?.label || null}
                        />
                    </Grid>        
                    <Grid item container xs={12} sx={{
                        display: state.type?.value === 'Others' ? 'visible' : 'none'
                    }}>
                        <Input 
                            size={12} 
                            isLabelVisible 
                            label='Description'
                            name='description'
                            value={state.description}
                            handleChange={handleInputChange}
                        />
                        <DatePicker
                            isLabelVisible
                            size={12}
                            label='Date'
                            name='date'
                            value={state.date}
                            handleChange={handleInputChange}
                        />
                    </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={onConfirm}>Confirm</Button>
                <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

CreateCalendarDialog.defaultProps = {
    toggle:()=>{}
}

export default CreateCalendarDialog