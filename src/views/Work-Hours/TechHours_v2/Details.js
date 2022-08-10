import React from 'react';
import {Grid,Typography,Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {toast} from 'react-toastify';

import {Input,Numeric,DatePicker} from '../../../components/inputs';
import {updateData} from '../../../store/work-hours';
import {useNull} from '../../../helpers/hooks';

import './Techhours.scss';

const Details = (props) => {
    const {index,id,project_code,emp_id,actual_date,actual_duration,sequence_no,remarks} = props;
    const dispatch = useDispatch();
    const [hasNull] = useNull()

    const [state,setState] = React.useState({
        actual_date:        actual_date,
        actual_duration:    actual_duration,
        sequence_no:        sequence_no,
        remarks:            remarks
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleSave = () => {
        const {remarks,...required} = state
        const nulls = hasNull(required)

        if(nulls.length > 0){
            return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
        }

        dispatch(updateData({
            route:id,
            data:{
                ...required,
                project_code:       project_code,
                emp_id:             emp_id,
            }
        }))  
        .unwrap()
        .then(result => {
            if(result.status === 200){
                props.updateData(index,'sequence_no',state.sequence_no)
                props.updateData(index,'actual_date',moment(state.actual_date).format('YYYY-MM-DD'))
                props.updateData(index,'actual_duration',state.actual_duration)
                props.updateData(index,'remarks',state.remarks)
            }
        })      
    }

    return (
        <Grid component={'div'} className='container' container>
            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography sx={{flexGrow:1}} variant='button'>Project: {project_code}</Typography>
                <Button size='small' variant='contained' onClick={handleSave}>SAVE</Button>
            </Grid>
            <Grid item container xs={12}>
                <Numeric    size={1} label='Sequence No'        name='sequence_no'          value={state.sequence_no}       handleChange={handleChange} isLabelVisible/>
                <DatePicker size={3} label='Actual Date'        name='actual_date'          value={state.actual_date}       handleChange={handleChange} isLabelVisible/>
                <Numeric    size={3} label='Actual Duration'    name='actual_duration'      value={state.actual_duration}   handleChange={handleChange} isLabelVisible/>
                <Input      size={5} label='Remarks'            name='remarks'              value={state.remarks}           handleChange={handleChange} isLabelVisible/>
            </Grid>    
        </Grid>    
    )
}

export default Details