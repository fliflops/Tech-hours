import React from 'react'
import {Grid,Typography} from '@mui/material';

const Label = ({
    label,
    value,
    size
}) => {
    return (
        <Grid item md={size} xs={12} sx={{
            display:'flex',
            flexDirection:'column',
            paddingLeft:1}}>
            <Typography variant='overline'>{label}</Typography>
            <Typography variant='button'>{value}</Typography>
        </Grid>
    )
}

Label.defaultProps = {
    label:'',
    value:'',
    size:6
}

export default Label
