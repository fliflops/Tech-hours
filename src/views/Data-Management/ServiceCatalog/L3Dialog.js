import React from 'react'
import {Dialog,DialogTitle,DialogContent,Grid,DialogActions,Button} from '@mui/material';
import {toast} from 'react-toastify'
import {Input} from '../../../components/inputs';
import {SimpleTable} from '../../../components/table';
import {RenderSwitch} from '../../../components/table/Columns';
import Spinner from '../../../components/spinner';

import {useDispatch,useSelector} from 'react-redux';
import {createData,getData} from '../../../store/data-management/data-management.slice'

function L3Dialog({
    isOpen,
	toggle,
    title,
    sub_catalog_id,
    is_edit
}) {
    const skipPageResetRef = React.useRef(false)
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    const [state,setState] = React.useState({
        l3_catalog_name:null
    })
    
    const [data,setData] = React.useState([])
    const columns = React.useMemo(()=>[
        {
            Header:'L3 Service Catalog',
            accessor:'l3_catalog_name'
        },
        {
            Header:'Is Active',
            accessor:'is_active',
            Cell: is_edit ? RenderSwitch : props => props.value === 1 ? 'true' : 'false'
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[data,is_edit])

    const handleChange = (e) =>{
        setState({
            [e.target.name]:e.target.value
        })
    }

    const handleAdd = () => {
        if(!state.l3_catalog_name){
            return toast.error('Provide catalog name!')
        }
        setData(data.concat({
            sub_catalog_id,
            l3_catalog_name:state.l3_catalog_name,
            is_active:1
        }))

        setState({
            ...state,
            l3_catalog_name:null
        })
    }

    const updateMyData = (rowIndex, columnID, value) => {
        skipPageResetRef.current    = true
        let catalog                 = [...data]
        data[rowIndex][columnID]    = value
        setData(catalog)
    }

    const handleConfirm = () => {
        if(data.length === 0){
            return toast.error('Please add L3 Service Catalogs!')
        }

        dispatch(createData({
            route:'service-catalog/l3-service-catalog',
            data
        }))
        .unwrap()
        .then(result => {
            refreshData()
            // toggle()
        })
    }

    const refreshData = () => {
        dispatch(getData({
            route:`service-catalog/l3-service-catalog/${sub_catalog_id}`, 
        }))
        .unwrap()
        .then(result => {
            setData(result.data)
        })
    }

    React.useEffect(()=>{
        if(isOpen){
            refreshData()
        }
        else{
            setData([])
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])


    return (
        <Dialog fullWidth maxWidth='md' open={isOpen}>
            <DialogTitle>{`${title} (Level 3 Service Catalog)`}</DialogTitle>
            <DialogContent dividers>
                <Spinner loading={loading}/>
                <Grid container>
                    <Grid item container xs={12} sx={{display: is_edit ? 'visible' : 'none' }}>
                        <Input size={12} isLabelVisible label='Level 3 Service Catalog' name='l3_catalog_name' value={state.l3_catalog_name} handleChange={handleChange}/>
                        <Grid item xs={12} sx={{display:'flex', marginBottom:1}}>
                            <div style={{flexGrow:1}}/>
                            <Button variant='contained' onClick={handleAdd}>Add</Button>
                        </Grid>
                    </Grid>
                    <SimpleTable
                        columns={columns}
                        data={data}
                        size={12}
                        updateData={updateMyData}
                        disablePageResetOnDataChange={skipPageResetRef}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary'     onClick={handleConfirm} sx={{display: is_edit ? 'visible' : 'none'}}>Confirm</Button>
                <Button variant='contained' color='secondary'   onClick={toggle}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default L3Dialog