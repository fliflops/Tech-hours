import React from 'react'
import {TextField,Grid,Typography,useTheme} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DatePicker as MUIDatePicker,LocalizationProvider} from '@mui/lab'

const DatePicker = ({label,name,size,handleChange,value,isLabelVisible,isDisabled,views}) => {
    const theme = useTheme()
    const onChange = (value) => {
        const e = {
            target:{
                name:name,
                value:value
            }
        }
        handleChange(e)
    }
    return (
        <Grid item xs={12} md={size} component='div' style={{
            display:'flex',
            flexDirection:'column',   
            paddingTop: isLabelVisible ? theme.spacing(0) : theme.spacing(1),  
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1)
        }}>
            <Typography sx={{
                    display:isLabelVisible ? 'visible' : 'none',
                }} 
                variant='overline'>{label}</Typography>           
            <LocalizationProvider dateAdapter={DateAdapter}>
                <MUIDatePicker 
                    clearable
                    disabled={isDisabled}
                    label={label}
                    value={value}
                    views={views}
                    onChange={onChange}
                    renderInput={(params)=> <TextField {...params} fullWidth size='small' margin='dense' sx={{
                        marginTop:0
                    }}/>}
                />
            </LocalizationProvider>
        </Grid>
    )
}

DatePicker.defaultProps = {
    isLabelVisible:false,
    isDisabled:false,
    label:'',
    placeholder:'',
    size:6,
    value:null,
    views:['day'],
    handleChange:()=>{}
}

export default DatePicker
