import React from 'react';
import {Grid,Paper,Typography,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import {toast} from 'react-toastify';

import Toolbar  from '../../../components/toolbar/Toolbar';
import {Label}  from '../../../components/labels';
import Spinner  from '../../../components/spinner';
import {SimpleTable} from '../../../components/table';
 
import {getEmployee,createEmployee} from '../../../store/employee';

import VLDialog from './vlDialog';

const RenderNumeric = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) => {

  const [value, setValue] = React.useState(initialValue)
  const handleChange =(e)=>{
    setValue(e.target.value)
  }

  const onBlur = () => {
    updateData(index, id, value)
  }

  return  <input 
      type='number' 
      style={{maxWidth:'150px',width:'100%',lineHeight:'10px'}}
      onChange={handleChange} 
      onBlur={onBlur}
      onFocus={e => e.target.select()}
      value={value}
      /> 
}


function EmployeeDetails() {
  let params = useParams();   
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.employee);
  const skipPageResetRef = React.useRef(false)

  const [state,setState] = React.useState({
    emp_first_name:null,
    emp_middle_name:null,
    emp_suffix:null,
    emp_last_name:null,
    emp_mobile_number:null,
    emp_employment_status:null,
    emp_nyx_user_id:null,
    user_email:null
  })

  const [controls,setControls] = React.useState({
    isEditWorkHours:false
  })

  const [vlDialog,setVlDialog] = React.useState(false)

  const [vl,setVl] = React.useState([])
  const [workHours,setWorkHours] = React.useState([])

  const vlColumn = React.useMemo(()=>[
    {
      Header:'Date From',
      accessor:'vl_date_from',
      Cell:props => {
        return moment(props.value).format('YYYY-MM-DD')
      }
    },
    {
      Header:'Date To',
      accessor:'vl_date_to',
      Cell:props => {
        return moment(props.value).format('YYYY-MM-DD')
      }
    },
    {
      Header:'Is Active',
      accessor:'is_active',
      Cell:props => {
        return props.value === 1 ? 'true':'false'
      }
    },
    {
      Header:'Reason',
      accessor:'vl_reason',
    },
  ],[]
  )
  const whColumn = React.useMemo(()=>[
    {
      Header:'Day of Week',
      accessor:'day_of_week' 
    },
    {
      Header:'Working Hours',
      accessor:'work_hours',
      Cell: controls.isEditWorkHours ?  RenderNumeric : (props) => props.value
    },
    {
      Header:'Scrum Hours',
      accessor:'scrum_hours',
      Cell: controls.isEditWorkHours ?  RenderNumeric : (props) => props.value
     
    },
    {
      Header:'Support Hours',
      accessor:'support_hours',
      Cell: controls.isEditWorkHours ?  RenderNumeric : (props) => props.value
    },
    {
      Header:'Lunch Break',
      accessor:'lunch_break',
      Cell: controls.isEditWorkHours ?  RenderNumeric : (props) => props.value
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[controls.isEditWorkHours,workHours])

  const toggleVlDialog = () => {
    setVlDialog(!vlDialog)
  }

  const handleAddToVl = ({
    vl_reason,
    vl_date_from,
    vl_date_to
  }) => {

    if(vl.filter(item => {return ( moment(vl_date_from).format('YYYY-MM-DD') === moment(item.vl_date_from).format('YYYY-MM-DD') || moment(vl_date_to).format('YYYY-MM-DD') === moment(item.vl_date_to).format('YYYY-MM-DD')) && item.is_active === 1}).length > 0)
    {
      return toast.error('Date already exists!')
    }
    

    setVl(vl.concat({
      vl_reason,
      vl_date_from,
      vl_date_to,
      is_active:1
    }))
    
    toggleVlDialog()
  }

  const handleEditWorkHours = () => {
    setControls({
      ...controls,
      isEditWorkHours:!controls.isEditWorkHours
    })

    if(controls.isEditWorkHours){
      refreshData()
    }
  }

  const handleVlSave = () => {
    dispatch(createEmployee({
      route:`vacation-leave`,
      data:vl.map(item => {
        return {
          ...item,
          emp_id:params.employee_id
        }
      })
    }))
    .unwrap()
    .then(result => {
      refreshData()
    })
  }

  const handleWorkHoursSave= () => {
    dispatch(createEmployee({
      route:'work-schedule',
      data:workHours
    }))
    .unwrap()
    .then(result => {
      handleEditWorkHours()
    })

    // console.log(workHours)
  }

  const refreshData = () => {
    dispatch(getEmployee({
      route:`${params.employee_id}`
    }))
    .unwrap()
    .then(result => {

      setState({
        ...state,
        ...result.data
      })
      setVl(result.data.vacation_leave)
      setWorkHours(result.data.working_hours.map(item => {
        return {
          ...item,
          emp_id:params.employee_id
        }
      }))
    })
  }

  const updateMyData = (rowIndex, columnID, value) => {
    skipPageResetRef.current = true
    let data = [...workHours]
    data[rowIndex][columnID] = value
    setWorkHours(data)
  }

  React.useEffect(()=>{
      refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(
    () => {
      skipPageResetRef.current = false
    },
    [workHours]
  )
  
  return (
    <Grid container spacing={1}>
      <Spinner loading={loading}/>
      <Grid item md={12} xs={12}>
        <Toolbar label='Employee Details' isBack/>
      </Grid>
      <Grid item md={12} xs={12}>
        <Grid component={Paper} variant='container' container>
          <Grid item xs={12}><Typography variant='button'>Employee Information</Typography></Grid>
          <Label size={6} label={'Email'} value={state.user_email}/>
          <Label size={6} label={'Full Name'} value={`${state.emp_first_name} ${state.emp_middle_name} ${state.emp_last_name}`}/>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid component={Paper} variant='container' container>
          <Grid item xs={6} sx={{marginBottom:2}}>
            <Typography variant='button'>Work Schedule</Typography>
          </Grid>
          <Grid item xs={6} sx={{marginBottom:2,display:'flex'}}>
            <div style={{flexGrow:1}}/>
            <Button size='small' variant='contained' onClick={handleEditWorkHours}>{
              controls.isEditWorkHours ? 'Cancel' : 'Edit'
            }</Button>
            <Button size='small' variant='contained' sx={{display:  controls.isEditWorkHours ? 'visibile':'none'}} onClick={handleWorkHoursSave}>Save</Button>
            
          </Grid>
          <SimpleTable
              size={12}
              columns={whColumn}
              data={workHours}
              updateData={updateMyData}
              disablePageResetOnDataChange={skipPageResetRef.current}
          />
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid component={Paper} variant='container' container>
          <Grid item xs={6} sx={{marginBottom:2}}>
            <Typography variant='button'>Planned Vacation Leave</Typography>
          </Grid>
          <Grid item xs={6} sx={{marginBottom:2,display:'flex'}}>
            <div style={{flexGrow:1}}/>
            <Button size='small' variant='contained' onClick={toggleVlDialog}>Add</Button>
            <Button size='small' variant='contained' onClick={handleVlSave}>Save</Button>
          </Grid>
          <SimpleTable
              size={12}
              columns={vlColumn}
              data={vl}
          />
        </Grid>
      </Grid>
      <VLDialog toggle={toggleVlDialog} isOpen={vlDialog} handleAdd={handleAddToVl}/>
    </Grid>    
  )
}



export default EmployeeDetails