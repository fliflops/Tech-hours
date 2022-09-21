import React from 'react'
import {Grid,Typography,Paper,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

import Toolbar from '../../../components/toolbar/Toolbar';
import {Input} from '../../../components/inputs';
import {Label} from '../../../components/labels';
import {ReactTableEditable} from '../../../components/table';
import {RenderSwitch} from '../../../components/table/Columns';
// import Switch from '../../../components/switch/Switch';
import Spinner from '../../../components/spinner';
import {MasterSelect} from '../../../components/select'
import {createData} from '../../../store/data-management'

function CreateServiceCatalog() {
    const skipPageResetRef = React.useRef(false)
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    const [state,setState] = React.useState({
        cat_name:null,
        cat_status:null,
        sub_catalog:null
    })
    const [subCatalog,setSubCatalog]=React.useState([])

    const columns = React.useMemo(()=>[
        {
            Header:'Sub Catalog Name',
            accessor:'sub_catalog_name'
        },
        {
            Header:'Status',
            accessor:'is_active',
            Cell: props => props.row.original.is_edit ? <RenderSwitch {...props}/> :  <label>{props.value === 1 ? 'ACTIVE' : 'INACTIVE'}</label>
        },
        {
            Header:'Actions',
            Cell:props=>{
                const handleDelete = () => {
                    let data = [...subCatalog]
                    data.splice(props.row.index,1)
                    setSubCatalog(data)
                }
          
                return <div style={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Button disabled={state.cat_status === 'ACTIVE'} size='small' variant='contained' color='secondary' onClick={handleDelete}> 
                        DELETE
                    </Button>
                </div>
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[subCatalog,state.cat_status])

    const updateData = (index,id,value) => {
        skipPageResetRef.current = true
        let temp = [...subCatalog]
        temp[index][id] = value
        setSubCatalog(temp)
    }
    
    const handleInputChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleSelectChange = (selected) => {
        setState({
            ...state,
            sub_catalog:selected
        })
    }

    const handleAdd=()=>{  
        

        if(!state.sub_catalog){
            return toast.error(`Sub Catalog is required`)
        }

        if(subCatalog.filter(item => item.sub_catalog_id === state.sub_catalog?.value).length > 0){
            return toast.error(`${state.sub_catalog?.label} already exists!`)
        }

        setSubCatalog(subCatalog.concat({
            catalog_id:null,
            sub_catalog_id:state.sub_catalog?.value,
            sub_catalog_name:state.sub_catalog?.label,
            is_edit:false,
            is_active:1
        }))

        setState({
            ...state,
            sub_catalog:null
        })
    }

    const handleConfirm =()=>{
        const {cat_status,...header} = state
        
        if(subCatalog.length === 0){
            return toast.error('Sub Catalogs are required!')
        }

        dispatch(createData({
            route:'service-catalog',
            data:{
                header,
                details:subCatalog
            }
        }))
        .unwrap()
        .then(result => {
            setState({
                ...state,
                cat_status:'ACTIVE'
            })
        })
    }

    React.useEffect(()=>{
        skipPageResetRef.current = false
    },[subCatalog]) 


    return (
        <Grid container spacing={1}>
            <Spinner loading={loading}/>
            <Grid item md={12} xs={12}>
                <Toolbar label='Create Service Catalog' isBack/>
            </Grid>
            <Grid item md={12} xs={12}>
                <Grid component={Paper} container item variant='container' md={12}>
                    <Grid item xs={12}><Typography variant='button'>Catalog Information</Typography></Grid>
                    <Input label='Service Catalog'  value={state.cat_name} name='cat_name' handleChange={handleInputChange} isLabelVisible/>
                    <Label label='Status'           value={state.cat_status}/>
               
                </Grid>
            </Grid> 
            <Grid item md={12} xs={12}>
                <Grid component={Paper} container item variant='container' md={12}>
                    <Grid item xs={12}><Typography variant='button'>Catalog Details</Typography></Grid>
                    <Grid item xs={12}>
                        <MasterSelect label='Level 2 Catalogs' type='service-catalog-l2' name='sub_catalog' value={state.sub_catalog} handleChange={handleSelectChange}/>
                        {/* <Input label='Sub Catalog' isLabelVisible value={state.sub_catalog} name='sub_catalog' handleChange={handleInputChange}/> */}
                    </Grid>
                    <Grid item md={12} sx={{marginTop:1,marginBottom:1,display:'flex'}}>
                        <div style={{flexGrow:1}}/>
                        <Button disabled={state.cat_status === 'ACTIVE'} variant='contained' color='primary' onClick={handleAdd}>Add</Button>
                        <Button disabled={state.cat_status === 'ACTIVE'} variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactTableEditable columns={columns} data={subCatalog} updateData={updateData}/>
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>
    )
}

export default CreateServiceCatalog