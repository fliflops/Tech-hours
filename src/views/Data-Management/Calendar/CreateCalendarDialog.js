import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material'
import {MasterSelect}       from '../../../components/select';
import {Input,DatePicker}   from '../../../components/inputs';

function CreateCalendarDialog({
    isOpen,
	toggle
}) {

    const [state,setState] = React.useState({
        calendar_type:null,
        date:null,
        description:null
    })

    const handleSelectChange = (e) => {
        setState({
            ...state,
            calendar_type:e
        })
    }

    const handleInputChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    return (

        <Dialog fullWidth maxWidth='md' open={isOpen}>
            <DialogTitle>Add to Calendar</DialogTitle>
            <DialogContent dividers sx={{minHeight: '50vh',maxHeight: '50vh'}}>
            <Grid container>
                    <Grid item md={12} xs={12}>
                        <MasterSelect 
                            label='Calendar Type'
                            type='quick-code'
                            filter='CALENDAR_TYPE' 
                            name='calendar_type'
                            value={state.calendar_type}
                            handleChange={handleSelectChange}
                        />
                    </Grid>
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
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary'>Confirm</Button>
                <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

CreateCalendarDialog.defaultProps = {
    toggle:()=>{}
}

export default CreateCalendarDialog