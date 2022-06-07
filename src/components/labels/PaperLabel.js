import React from 'react';
import {
    //Grid,
    Paper,
    //Button,
    Typography,
    useTheme} from '@mui/material'

const PaperLabel = ({
    handleRemove,
    value
}) => {
    const theme = useTheme();
    return (
        <Paper 
        component='button'
        elevation={0}
        variant='outlined'
        onClick={handleRemove}
        sx={{
            padding:theme.spacing(1),
            display:'flex',
        }}>
            <Typography>
                    {value}
            </Typography>
            
        </Paper>
    )
}

export default PaperLabel
