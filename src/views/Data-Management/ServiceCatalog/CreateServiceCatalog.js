import React from 'react'
import {Grid,Typography,Paper,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

import Toolbar from '../../../components/toolbar/Toolbar';
import {Input} from '../../../components/inputs';
import {Label} from '../../../components/labels';
import {SimpleTable} from '../../../components/table';
import Switch from '../../../components/switch/Switch';
import Spinner from '../../../components/spinner';
import {createData} from '../../../store/data-management'

function CreateServiceCatalog() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    const [state,setState] = React.useState({
        cat_name:null,
        cat_status:null,
    })
    const [subCatalog,setSubCatalog]=React.useState([])

    const columns = React.useMemo(()=>[
        {
            Header:'Sub Catalog Name',
            accessor:'sub_catalog_name'
        },
        {
            Header:'Is Active',
            accessor:'is_active',
            Cell:props =>{
                const handleChange = (e) => {
                  let data = [...subCatalog]
                  data[props.row.index]['is_active'] = e.target.checked ? 1 : 0
                  setSubCatalog(data)
                }
        
                return (
                  <div>
                  {
                    props.row.original.is_edit ? <Switch checked={props.value === 1 ? true : false} handleChange={handleChange}/> :
                    <label>{props.value === 1 ? 'true' : 'false'}</label> 
                  }
                </div>
                )
            }
        },
        {
            Header:'Actions',
            Cell:props=>{
                const handleEdit = () => {
                    let data = [...subCatalog]
                    data[props.row.index]['is_edit']=!props.row.original.is_edit 
                    setSubCatalog(data)
                }

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
                    <Button disabled={state.cat_status === 'ACTIVE'} size='small' variant='contained' onClick={handleEdit}>
                      {props.row.original.is_edit ? 'SAVE' : 'EDIT'}
                    </Button>
                </div>
            }
        }
    ],[subCatalog,state.cat_status])
    
    const handleInputChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const handleAdd=()=>{
        if(!state.sub_catalog){
            return toast.error(`Sub Catalog is required`)
        }

        setSubCatalog(subCatalog.concat({
            sub_catalog_name:state.sub_catalog,
            is_active:1,
            is_edit:false
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
                        <Input label='Sub Catalog' isLabelVisible value={state.sub_catalog} name='sub_catalog' handleChange={handleInputChange}/>
                    </Grid>
                    <Grid item md={12} sx={{marginTop:1,marginBottom:1,display:'flex'}}>
                        <div style={{flexGrow:1}}/>
                        <Button disabled={state.cat_status === 'ACTIVE'} variant='contained' color='primary' onClick={handleAdd}>Add</Button>
                        <Button disabled={state.cat_status === 'ACTIVE'} variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
                    </Grid>
                    <SimpleTable size={12} data={subCatalog} columns={columns}/>
                </Grid> 
            </Grid>
        </Grid>
    )
}

export default CreateServiceCatalog