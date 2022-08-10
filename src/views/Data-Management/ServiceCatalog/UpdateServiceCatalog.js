import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Grid,Paper,Typography,Button} from '@mui/material';

import Toolbar            from '../../../components/toolbar/Toolbar';
import Spinner            from '../../../components/spinner/spinner'; 
import {Label}            from '../../../components/labels';
import {ReactTableEditable}      from '../../../components/table';
import {RenderSwitch} from '../../../components/table/Columns'
import Switch             from '../../../components/switch/Switch';
import SubCategoryDialog  from './Dialog';

import {getData,updateData as updateApi} from '../../../store/data-management';

function UpdateServiceCatalog() {
  const skipPageResetRef = React.useRef(false)
  let params = useParams(); 
  let navigate = useNavigate();

  const {loading} = useSelector(state => state.dataManagement);
  const dispatch = useDispatch();

  const [state,setState] = React.useState({
    cat_name:null,
    cat_status:null,
  })

  const [isEdit,setEdit]            = React.useState(false)
  const [dialog,setDialog]          = React.useState(false)
  
  const [subCatalog,setSubCatalog]  = React.useState([])

  const columns = React.useMemo(()=>[
    {
      Header:'Sub Catalog Name',
      accessor:'sub_catalog_name',
    },
    {
      Header:'Is Active',
      accessor:'is_active',
      Cell: isEdit ? RenderSwitch : props => props.value === 1 ? 'true' : 'false'
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[isEdit,subCatalog])

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
      sub_catalog_id: sub_catalog?.value,
      sub_catalog_name: sub_catalog?.label,
      is_active:1,
      is_edit:false
    }))
  }

  const handleConfirm = () => {
    const catalog_id = params.catalog_id
    dispatch(updateApi({
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

  const updateData = (index,id,value) => {
    skipPageResetRef.current = true
    let temp = [...subCatalog]
    temp[index][id] = value
    setSubCatalog(temp)
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

  React.useEffect(()=>{
    skipPageResetRef.current = false
  },[subCatalog])  

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
              <ReactTableEditable  
                data={subCatalog} 
                columns={columns} 
                //disablePageResetOnDataChange={skipPageResetRef}
                updateData={updateData}
              />
            </Grid>
          </Grid>
          <SubCategoryDialog isOpen={dialog} toggle={toggle} handleAdd={handleAdd}/>
          </Grid>
     </Grid>
  )
}

export default UpdateServiceCatalog