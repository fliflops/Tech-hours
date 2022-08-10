import React from 'react';
import {TextField,Grid,useTheme,Typography} from '@mui/material';
// import _ from 'lodash'

function Input({label,name,size,handleChange,value,isLabelVisible,isDisabled,isMultiline}) {
    const theme = useTheme()
//    const debouncedChangeHandler = _.debounce((e)=>handleChange(e),300)
   

    return (
        <Grid item xs={12} md={size} component='div' sx={{
            display:'flex',
            flexDirection:'column',   
            paddingTop: isLabelVisible ? theme.spacing(0) : theme.spacing(1),  
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1)
        }}>
            <Typography sx={{
                display:isLabelVisible ? 'visible' : 'none'
            }} 
            variant='overline'>{label}</Typography>          
            <TextField
                disabled={isDisabled}
                sx={{marginTop:0}}
                fullWidth
                name={name}
                size='small'
                label={label}
                placeholder={label}
                margin='dense'
                variant='outlined'
                value={value || ''}
                onChange={handleChange}
                multiline={isMultiline}
                rows={2}
            />
        </Grid>
    )
}

Input.defaultProps = {
    isLabelVisible:false,
    isDisabled:false,
    isMultiline:false,
    label:'',
    placeholder:'',
    size:6,
    value:'',
    handleChange:()=>{}
}

export default Input