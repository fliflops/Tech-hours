import React from 'react';
import {TextField,Grid,useTheme,Typography} from '@mui/material';

function Numeric({label,name,size,handleChange,value,isLabelVisible,isDisabled,isMultiline}) {
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
                
                inputProps={{
                    inputMode:'numeric',
                    pattern:'[0-9]*'
                }}
            />
        </Grid>
    )
}

Numeric.defaultProps = {
    isLabelVisible:false,
    isDisabled:false,
    isMultiline:false,
    label:'',
    placeholder:'',
    size:6,
    value:'',
    handleChange:()=>{}
}

export default Numeric