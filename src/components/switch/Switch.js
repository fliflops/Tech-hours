import React from 'react';
import Switch from '@mui/material/Switch';
import {useTheme,Typography,FormControlLabel} from '@mui/material'

const SwitchInput = ({label,name,handleChange,checked,isLabelVisible,isDisabled}) => {
    const theme = useTheme()
    return (
        <div style={{
            display:'flex',
            flexDirection:'column',   
            paddingTop: isLabelVisible ? theme.spacing(0) : theme.spacing(1),  
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1)
        }}>
            <Typography sx={{
                display:isLabelVisible ? 'visible' : 'none'
            }} 
            variant='overline'>
                {label}
            </Typography>
            <FormControlLabel 
                control={
                    <Switch 
                        size='small'
                        name={name}
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                } 
            label={label}/>
            
        </div>
    )
}

SwitchInput.defaultProps = {
    isLabelVisible:false,
    isDisabled:false,
    label:'',
    name:'',
    checked:false,
    handleChange:()=>{}
}


export default SwitchInput
