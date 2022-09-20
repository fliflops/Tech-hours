import React from 'react';
import {Grid,Button,Paper} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux'

import Toolbar from '../../../components/toolbar';
import Spinner from '../../../components/spinner';

import {ReactTableEditable}  from '../../../components/table';
import {RenderSwitch} from '../../../components/table/Columns';
import {getData,createData} from '../../../store/data-management';

import CreateDialog from './CreateDialog';

const ServiceCatalogL2 = () => {
  const skipPageResetRef = React.useRef(false)
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.dataManagement)
  const [createDialog,setCreateDialog] = React.useState(false)
  const [data,setData] = React.useState([])
  const [isEdit,setEdit] = React.useState(false)

  const columns = React.useMemo(()=>[
    {
      Header:'L2 Catalog Name',
      accessor:'sub_catalog_name',
    },
    {
      Header:'Status',
      accessor:'is_active',
      Cell:isEdit ? RenderSwitch : props => props.value === 1 ? 'ACTIVE' : 'INACTIVE'
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[data,isEdit])

  const onCreate = () => {
    setCreateDialog(!createDialog)
  }

  const onAdd = (subcatalog) => {
    setData(data.concat({
      sub_catalog_name:subcatalog,
      is_active:1
    }))
  }

  const refreshData = () => {
    dispatch(getData({
      route:'service-catalog-l2',
    }))
    .unwrap()
    .then(result => {
        setData(result.data)
    })  
  }

  const handleEdit = () => {
    if(isEdit){
      refreshData()
    }
    setEdit(!isEdit)
  }

  const updateData = (index,id,value) => {
    skipPageResetRef.current = true
    let temp = [...data]
    temp[index][id] = value
    setData(temp)
  }

  const handleSave = () => {
    dispatch(createData({
      route:'service-catalog-l2',
      data
    }))
    .unwrap()
    .then(()=>{
      setEdit(false)
    })
  }

  React.useEffect(()=>{
    refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(() => {skipPageResetRef.current = false},[data])

  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
        <Grid item md={12} xs={12}>
          <Toolbar label='Service Catalogs Level 2'/>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid item container xs={12} component={Paper} variant='container'>
            <Grid item xs={12} component='div' sx={{display:'flex',marginBottom:1}}>
              <div style={{flexGrow:1}}/>
              <Button variant='contained'sx={{display: isEdit ? 'visible':'none'}} onClick={onCreate}>New</Button>
              <Button variant='contained'sx={{display: isEdit ? 'visible':'none'}} onClick={handleSave}>Save</Button>
              <Button variant='contained' onClick={handleEdit}>{isEdit ? 'Cancel':'Edit'}</Button>
            </Grid>
            <Grid item xs={12}>
              <ReactTableEditable
                columns={columns}
                data={data}
                updateData={updateData}
                //disablePageResetOnDataChange={skipPageResetRef}        
              />
            </Grid>
          </Grid>
        </Grid>
        <CreateDialog toggle={onCreate} isOpen={createDialog} handleAdd={onAdd}/>
    </Grid>
  )
}

export default ServiceCatalogL2