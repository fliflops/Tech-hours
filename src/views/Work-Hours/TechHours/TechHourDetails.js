import React from 'react';
import {Grid,Button,Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import {createData,getData} from '../../../store/work-hours';

import {ReactTable} from '../../../components/table';
import {Select,NumericInput,DateInput,TextInput} from '../../../components/table/Columns';

import './Techhours.scss';
import moment from 'moment';

const TechHourDetails = (props) => {
    const skipPageResetRef = React.useRef(false)
    const {project_service_catalog,emp_id,project_code,project_role} = props;
    const [data,setData] = React.useState([])
    const [isEdit,setEdit] = React.useState(false)

    const dispatch = useDispatch()
    
    const columns = React.useMemo(()=>[
        {
            Header:'L2 Catalog',
            accessor:'sub_catalog_name',
            Cell:props =>  {
                if(props.row.original.isCreated === false){
                    return isEdit ?  <Select {...props} route='service-catalog-l2' columnValue = 'l2_catalog' type={props.row.original.service_catalog}/> : props.value
                }
                else{
                    return props.value
                }
            }
        },
        {
            Header:'L3 Catalog',
            accessor:'l3_catalog_name',
            // Cell:props => {
            //     if(props.row.original.isCreated === false){
            //         return  isEdit ? <Select {...props} route='l3-service-catalog' columnValue='l3_catalog' type={props.row.original.l2_catalog}/> : props.value
            //     }
            //     else{
            //         return props.value
            //     }
            // }
        },
        {
            Header:'Planned Start Date',
            accessor:'planned_date',
            Cell: props => {
                if(props.row.original.isCreated === false){
                    return isEdit ? <DateInput {...props}/> : props.value
                }
                else{
                    return props.value
                }
            }
        },
        {
            
            Header:'Planned Duration',
            accessor:'planned_duration',
            Cell:props => {
                if(props.row.original.isCreated === false){
                    return isEdit ? <NumericInput {...props}/> : props.value
                }
                else{
                    return props.value
                }
            } 
        },
        {
            Header:'Actual Start Date',
            accessor:'actual_date',
            Cell:isEdit ? DateInput : props => props.value
        },
        {
            Header:'Actual Duration',
            accessor:'actual_duration',
            Cell: isEdit ? NumericInput : props => props.value
        },
        {
            Header:'Remarks',
            accessor:'remarks',
            Cell: isEdit ? TextInput : props => props.value
        },
        {
            Header:'Actions',
            width:90,
            Cell:props => {
                const handleDelete = () =>{
                    let temp = [...data]
                    const row = props.row
                    const index = row.index
                    temp.splice(index,1)

                    setData(temp)
                }
                
                return (
                    <div>
                        <Button disabled={props.row.original.isCreated} size='small' variant='contained' onClick={handleDelete}>Delete</Button>
                    </div>
                )
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[data,isEdit]) 

    const handleNewData = () => {
        setData(data.concat({
            project_code,
            role_id: project_role,
            service_catalog: project_service_catalog,
            emp_id,
            l2_catalog:null,
            sub_catalog_name:null,
            l3_catalog:null,
            l3_catalog_name:null,
            planned_date:null,
            actual_date:null,
            planned_duration:0,
            actual_duration:0,
            remarks:null,
            isCreated: false
        }))
    }

    const updateData = (index,id,value) => {
        skipPageResetRef.current = true
        let temp = [...data]
        temp[index][id] = value
        setData(temp)
    }

    const handleEdit = () =>{
        setEdit(!isEdit)

        if(isEdit){
            setData(data.filter(item => item.isCreated))
        }
    }

    const handleSave = () =>{
        dispatch(createData({
            route:'',
            data
        }))
        .unwrap()
        .then(result => {
            setData(data.map(item => {
                return {
                    ...item,
                    planned_date:moment(item.planned_date).format('YYYY-MM-DD'),
                    actual_date:moment(item.actual_date).format('YYYY-MM-DD'),
                    isEdit,
                    isCreated:true
                }
            }))
        })
    }

    React.useEffect(()=>{
        skipPageResetRef.current = false
    },[data])  

    React.useEffect(()=>{
        dispatch(getData({
            route:`project/${project_code}`,
            filters:{
                service_catalog:project_service_catalog,
                role_id:project_role,
                emp_id:emp_id
            }
        }))
        .unwrap()
        .then(result =>{
            setData(result.data.map(item => {
                return {
                    ...item,
                    planned_date:moment(item.planned_date).format('YYYY-MM-DD'),
                    actual_date:moment(item.actual_date).format('YYYY-MM-DD'),
                    isEdit,
                    isCreated:true
                }
            }))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Grid component={'div'} className='container' container spacing={1}>
            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography sx={{flexGrow:1}} variant='button'>Project Details</Typography>
                <Button     sx={{ display: isEdit ?'visible' : 'none'}} size='small' variant='contained' onClick={handleSave}>SAVE</Button>
                <Button     sx={{ display: isEdit ?'visible' : 'none'}} size='small' variant='contained' onClick={handleNewData}>NEW</Button>
                <Button     size='small' variant='contained' onClick={handleEdit}>{isEdit ? 'CLOSE' : 'EDIT'}</Button> 
            </Grid>
            <Grid item xs={12}>
                <ReactTable 
                    columns={columns} 
                    data={data}
                    updateData={updateData}
                    disablePageResetOnDataChange={skipPageResetRef}
                />
            </Grid>

        </Grid>
    )
}

export default TechHourDetails