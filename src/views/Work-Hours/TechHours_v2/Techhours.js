import React from 'react';
import {Grid,Paper} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import moment from 'moment';

import Toolbar from '../../../components/toolbar';
import Spinner from '../../../components/spinner';
import {ReactTable} from '../../../components/table';
import {MasterSelectFilter} from '../../../components/table/Filters'

import {getData} from '../../../store/work-hours';

import Details from './Details';
import CreateDialog from './DialogCreate';


const Techhours = () => {
  const {loading} = useSelector(state => state.workHours);
  const dispatch  = useDispatch();
  const [createDialog,setCreateDialog] = React.useState({
    isOpen:false
  })

  const [trigger,setTrigger] = React.useState(false)
    
  const columns = React.useMemo(()=>[
      {
        Header:'#',
        width:30,
        Cell:props => props.row.index + 1,
      },
      {
        Header:'Project Code',
        accessor:'project_code',
        Filter:props => <MasterSelectFilter column={props.column} label='Project Code' name='project_code' type='project'/>,
        Cell: props=> (
          <div
          {...props.row.getToggleRowExpandedProps()}
          style={{
            display:'flex',
            width:'100%',
            height:'100%',
            cursor:'pointer'
          }}
          >
            <span style={{flexGrow:1}}>{props.value}</span>
                    {props.row.isExpanded ? <ExpandLess/> : <ExpandMore/>}
          </div>
        )
      },
      {
        Header:'L1 Service Catalog',
        accessor:'service_catalog_name',
        disableSortBy:true,
      },
      {
        Header:'L2 Service Catalog',
        accessor:'l2_catalog_name',
        disableSortBy:true,
      },
      {
        Header:     'L3 Service Catalog',
        accessor:   'l3_catalog',
        disableSortBy:true,
      },
      {
        Header:'Planned Date',
        accessor:'planned_date',  
      },
      {
        Header:'Planned Duration',
        accessor:'planned_duration',
        width:60
      },
      {
        Header:'Actual Start Date',
        accessor:'actual_date',
      },
      {
        Header:'Actual duration',
        accessor:'actual_duration',
        width:60,
      },
      {
        Header:'Seq. No',
        accessor:'sequence_no',
        width:50,
      },
      {
        Header:'Remarks',
        accessor:'remarks',
      },
      {
        Header:'Role',
        accessor:'role_name',
        disableSortBy:true
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[])

  const fetchData = React.useCallback(({pageIndex,pageSize,orderBy,filters},callBack)=>{
    dispatch(getData({
        route:'project',
        page:pageIndex,
        totalPage: pageSize,
        orderBy,
        filters
    }))
    .unwrap()
    .then(result => {
      callBack(result)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[trigger])

  const toggleCreateDialog = () => {
    setCreateDialog({
      ...createDialog,
      isOpen:!createDialog.isOpen
    })
  }


  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item xs={12}>
        <Toolbar label='Task Creation' isCreate onCreate={toggleCreateDialog}/>
      </Grid>
      <Grid item xs={12}>
        <Grid item container xs={12} component={Paper} variant='container'>
          <Grid item xs={12}>
            <ReactTable
              columns={columns}
              fetchData={fetchData} 
              subComponent={Details}
            />
          </Grid>
        </Grid>
        
      </Grid>
      <CreateDialog isOpen={createDialog.isOpen} toggle={toggleCreateDialog} trigger={()=>{setTrigger(!trigger)}}/>
    </Grid>
  )
}

export default Techhours