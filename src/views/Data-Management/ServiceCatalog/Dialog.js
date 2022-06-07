import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {toast} from 'react-toastify'
import {Input} from '../../../components/inputs';

function SubCategoryDialog({
    isOpen,
	toggle,
    handleAdd
}) {
    const [state,setState] = React.useState({
        sub_catalog_name:null
    })

    const handleChange = (e) =>{
        setState({
            [e.target.name]:e.target.value
        })
    }

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

    return (
        <Dialog fullWidth open={isOpen}>
            <DialogTitle>New SubCategory</DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Input size={12} isLabelVisible label='Sub Category' name='sub_catalog_name' value={state.sub_catalog_name} handleChange={handleChange}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={addToSubCat}>Confirm</Button>
                <Button variant='contained' color='secondary' onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SubCategoryDialog