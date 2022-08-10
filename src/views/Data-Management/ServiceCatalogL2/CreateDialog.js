import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {toast} from 'react-toastify'
import {Input} from '../../../components/inputs';


const CreateDialog = ({
    isOpen,
    toggle,
    handleAdd
}) => {
    const [state,setState] = React.useState({
        sub_catalog_name:null
    })

    const addToSubCat = () => {
        if(!state.sub_catalog_name){
            return toast.error('Sub Catalog is required')
        }

        handleAdd(state.sub_catalog_name)
        setState({
            ...state,
            sub_catalog_name:null
        })
        toggle()
    }

    const handleChange = (e) =>{
        setState({
            [e.target.name]:e.target.value
        })
    }

    return (
        <Dialog fullWidth open={isOpen}>
            <DialogTitle>Create Level 2 Service Catalog</DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Input size={12} isLabelVisible label='Level 2 Service Catalog' name='sub_catalog_name' value={state.sub_catalog_name} handleChange={handleChange}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={addToSubCat}>Confirm</Button>
                <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog