import React from 'react'
import {Toolbar as MUIToolbar, Button, Paper, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom'

function Toolbar({
    label,
    onCreate,
    onEdit,
    isCreate,
    isBack,
    isEdit
}) {

    const navigate = useNavigate()

    const onBack = () => {
        navigate(-1)
    }
    return (
    <Paper variant='outlined' sx={{
        paddingLeft:1,
        paddingRight:1
    }}>
        <MUIToolbar disableGutters>
            <Typography variant='h6'>{label}</Typography>
            <div style={{flexGrow: 1}}/>
            <div>
                <Button variant='contained' color='primary' sx={{display: isCreate ? 'visible':'none'}} onClick={onCreate}>
                    Create
                </Button>
            </div>
            <div>
                <Button variant='contained' color='secondary' sx={{display: isEdit ? 'visible':'none'}} onClick={onEdit}>
                    Edit
                </Button>
            </div>
            <div>
                <Button variant='contained' color='secondary' sx={{display: isBack ? 'visible':'none'}} onClick={onBack}>
                    Back
                </Button>
            </div>
        </MUIToolbar>
    </Paper>
  )
}

Toolbar.defaultProps = {
    label:'',
    onCreate:()=>{},
    onEdit:()=>{},
    isCreate:false,
    isBack:false,
    isEdit:false
}

export default Toolbar