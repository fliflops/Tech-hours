import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Grid,Paper,Typography,Button} from '@mui/material';

import Toolbar            from '../../../components/toolbar/Toolbar';
import Spinner            from '../../../components/spinner/spinner'; 
import {Label}            from '../../../components/labels';
import {SimpleTable}      from '../../../components/table';
import Switch             from '../../../components/switch/Switch';
import SubCategoryDialog  from './Dialog';
import L3Dialog           from './L3Dialog';

import {getData,updateData} from '../../../store/data-management';

function UpdateServiceCatalog() {
  let params = useParams(); 
  let navigate = useNavigate();

  const {loading} = useSelector(state => state.dataManagement);
  const dispatch = useDispatch();

  const [state,setState] = React.useState({
    cat_name:null,
    cat_status:null,
  })

  const [controls,setControls]=React.useState({
    selectedSubCatalog: null,
    l3DialogTitle:null
  })

  const [isEdit,setEdit]            = React.useState(false)
  const [dialog,setDialog]          = React.useState(false)
  const [l3Dialog,setL3Dialog]      = React.useState(false)
  
  const [subCatalog,setSubCatalog]  = React.useState([])

  const columns = React.useMemo(()=>[
    {
      Header:'Sub Catalog Name',
      accessor:'sub_catalog_name',
      Cell:props => {
        const onClick = () => {
          setControls({
            ...controls,
            selectedSubCatalog:props.row.original.id,
            l3DialogTitle:props.value
          })
          toggleL3Dialog()
        }

        return <Button size='small' onClick={onClick}>{props.value}</Button>
      }
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
            isEdit ? <Switch checked={props.value === 1 ? true : false} handleChange={handleChange}/> :
            <label>{props.value === 1 ? 'true' : 'false'}</label> 
          }
        </div>
        )
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[isEdit,subCatalog])

  const toggleL3Dialog = () => {
    setL3Dialog(!l3Dialog)
  }

  const handleEdit = () => {
    setEdit(!isEdit)
  }

  const handleChangeStatus = (e) => {
    setState({
      ...state,
      cat_status: e.target.checked ? 'ACTIVE' : 'INACTIVE'
    })
  }

  const toggle = () => {
    setDialog(!dialog)
  }

  const handleAdd = (sub_catalog) => {
    const catalog_id = params.catalog_id
    setSubCatalog(subCatalog.concat({
      catalog_id,
      sub_catalog_name:sub_catalog,
      is_active:1,
      is_edit:false
  }))
  }

  const handleConfirm = () => {
    const catalog_id = params.catalog_id
    dispatch(updateData({
      route:`service-catalog/${catalog_id}`,
      data:{
        header:{
          catalog_id,
          ...state
        },
        details:subCatalog
      }
    }))
    .unwrap()
    .then(result => {
      setEdit(false)
    })
  }

  React.useEffect(() => {
    const catalog_id = params.catalog_id

    dispatch(getData({
      route:`service-catalog/${catalog_id}`
    }))
    .unwrap()
    .then(result => {
      setState({
        ...state,
        cat_name:result.header.cat_name,
        cat_status:result.header.cat_status
      })
      setSubCatalog(result.details)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params,navigate,isEdit])

  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item md={12} xs={12}>
        <Toolbar label='Service Catalog Details' isBack isEdit={!isEdit} onEdit={handleEdit}/>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} container item variant='container' md={12}>
          <Grid item xs={12}><Typography variant='button'>Service Catalog Header</Typography></Grid>
            <Label value={state.cat_name} label='Service Catalog'/>
            <Grid item xs={6}>
              { 
                isEdit
                ?<Switch isLabelVisible label='Status' checked={state.cat_status === 'ACTIVE'? true : false} handleChange={handleChangeStatus}/>
                :<Label value={state.cat_status} label='Status'/>
              }
            </Grid>
            <Grid item md={12} sx={{marginTop:1,marginBottom:1,display:'flex', visibility: isEdit ? 'visible':'hidden'}}>
              <div style={{flexGrow:1}}/>         
              <Button variant='contained' onClick={toggle}>New</Button>
              <Button variant='contained' onClick={handleConfirm}>Confirm</Button>
              <Button variant='contained' onClick={handleEdit}>Cancel</Button>
            </Grid>

            <Grid item xs={12} sx={{marginTop:1}}>
              <SimpleTable size={12} data={subCatalog} columns={columns}/>
            </Grid>
          </Grid>
          <SubCategoryDialog isOpen={dialog} toggle={toggle} handleAdd={handleAdd}/>
          <L3Dialog isOpen={l3Dialog} toggle={toggleL3Dialog} sub_catalog_id={controls.selectedSubCatalog} is_edit={isEdit} title={controls.l3DialogTitle}/>
         </Grid>
     </Grid>
  )
}

export default UpdateServiceCatalog