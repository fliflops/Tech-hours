import React from 'react';
import {Grid,Paper,Button} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';
import moment from 'moment';

import Toolbar from '../../../components/toolbar';
import Spinner from '../../../components/spinner';
import {MasterSelect} from '../../../components/select';

import {DatePicker} from '../../../components/inputs';
import {getData} from '../../../store/work-hours';
import {ReactTable} from '../../../components/table';
import {Select,NumericInput,DateInput,TextInput} from '../../../components/table/Columns';

// import {createData} from '../../../store/work-hours';

const TechHours = () => {
    const {loading} = useSelector(state => state.workHours);
    const dispatch  = useDispatch();
    const skipPageResetRef = React.useRef(false)
    const [data,setData] = React.useState([])
    const [isEdit,setEdit] = React.useState(false)

    const [filters,setFilters] = React.useState({
        from:moment().startOf('month'),
        to:moment().endOf('month'),
        project:null
    })

    const columns = React.useMemo(()=>[
        {
            Header:'#',
            width:30,
            Cell:props => props.row.index + 1,
        },
        {
            Header:'Project Code',
            accessor:'project_code',
            Cell:props =>  {
                if(props.row.original.isCreated === false){
                    return isEdit ?  <Select {...props} route='project' columnValue = 'project_code'/> : props.value
                }
                else{
                    return props.value
                }
            }
        },
        {
            Header:'Service Catalog',
            accessor:'service_catalog_name',
            disableSortBy:true,
            Cell:props =>{
                if(props.row.original.isCreated === false){
                    return isEdit ?  <Select {...props} route='service-catalog' columnValue = 'service_catalog' type={props.row.original.project_code}/> : props.value
                }
                else{
                    return props.value
                }
            }
        },
        {
            Header:'L2 Catalog',
            accessor:'l2_catalog_name',
            disableSortBy:true,
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
            Header:     'L3 Catalog',
            accessor:   'l3_catalog',
            disableSortBy:true,
            Cell: props => {
                if(props.row.original.isCreated === false){
                    return isEdit? <TextInput {...props}/> : props.value
                }
                else{
                    return props.value
                }
            }
        },
        {
            Header:'Planned Date',
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
            width:60,
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
            Header:'Actual duration',
            accessor:'actual_duration',
            width:60,
            Cell: isEdit ? NumericInput : props => props.value
        },
        {
            Header:'Seq. No',
            accessor:'sequence_no',
            width:50,
            Cell:isEdit ? NumericInput : props => props.value
        },
        {
            Header:'Remarks',
            accessor:'remarks',
            Cell: isEdit ? TextInput : props => props.value
        },
        {
            Header:'Role',
            accessor:'role_name',
            disableSortBy:true
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
    ],[isEdit])

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name] : e.target.value
        })
    }

    const handleSelectFilterChange = (e,name) => {
        setFilters({
            ...filters,
            [name]:e
        })
    }

    const handleEdit = () =>{
        setEdit(!isEdit)
        // if(isEdit){
        //     setData(data.filter(item => item.isCreated))
        // }
    }

    const updateData = (index,id,value) => {
        skipPageResetRef.current = true
        let temp = [...data]
        temp[index][id] = value
        // setData(temp)
    }

    const handleSave = () => {
        // dispatch(createData({
        //     route:'',
        //     data:data
        // }))
        // .unwrap()
        // .then(result => {
        //     refreshData()
        // })
    }

    const handleNewData = () => {
        console.log('test')
        return {
            project_code:           null,
            service_catalog_name:   null,
            service_catalog:        null,
            l2_catalog:             null,
            sub_catalog_name:       null,
            l3_catalog:             null,
            planned_date:           null,
            actual_date:            null,
            planned_duration:       0,
            actual_duration:        0,
            sequence_no:            0,
            role_name:              null,
            role_id:                null,
            remarks:                null,
            isCreated:              false
        }
        //get sequence no
        // setData(data.concat({
        //     project_code:           null,
        //     service_catalog_name:   null,
        //     service_catalog:        null,
        //     l2_catalog:             null,
        //     sub_catalog_name:       null,
        //     l3_catalog:             null,
        //     planned_date:           null,
        //     actual_date:            null,
        //     planned_duration:       0,
        //     actual_duration:        0,
        //     sequence_no:            0,
        //     role_name:              null,
        //     role_id:                null,
        //     remarks:                null,
        //     isCreated:              false
        // }))
    }

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
    },[])

    // const refreshData = () => {
    //     dispatch(getData({
    //         route:`project`,
    //         filters:{
    //             from:moment(filters.from).format('YYYY-MM-DD'),
    //             to:moment(filters.to).format('YYYY-MM-DD'),
    //             project_code:filters.project?.value
    //         }
    //     }))
    //     .unwrap()
    //     .then(result => {
    //         setData(result.data.map(item => {
    //             return {
    //                 ...item,
    //                 //isEdit,
    //                 planned_date:moment(item.planned_date).format('YYYY-MM-DD'),
    //                 actual_date:moment(item.actual_date).format('YYYY-MM-DD'),
    //                 isCreated:true
    //             }
    //         }))
    //     })
    // }


    React.useEffect(()=>{
        skipPageResetRef.current = false
    },[data])

    // React.useEffect(()=>{
    //     refreshData()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[filters])

    return (
        <Grid container spacing={1}>
            <Spinner loading={loading}/>
            <Grid item md={12} xs={12}>
                <Toolbar label='Tech Hours'/>
            </Grid>
            <Grid item md={12} xs={12}>
                <Grid item container xs={12} component={Paper} variant='container'>
                    <Grid item container xs={12}>
                        <DatePicker label='Planned Date From'   name='from' value={filters.from} size={3} isLabelVisible handleChange={handleFilterChange}/>
                        <DatePicker label='Planned Date to'     name='to'   value={filters.to}   size={3} isLabelVisible handleChange={handleFilterChange}/>

                        <Grid item xs={3}>
                            <MasterSelect label='Project'  type='project' name='project' value={filters.project} handleChange={handleSelectFilterChange}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} component='div' sx={{display:'flex', paddingBottom:1,paddingTop:1}}>
                        <div style={{flexGrow:1}}/>
                        {/* <Button sx={{ display: isEdit ?'visible' : 'none'}} size='small' variant='contained' onClick={handleSave}>SAVE</Button>
                        <Button sx={{ display: isEdit ?'visible' : 'none'}} size='small' variant='contained' onClick={handleNewData}>NEW</Button> */}
                        <Button     size='small' variant='contained' onClick={handleEdit}>{isEdit ? 'CLOSE' : 'EDIT'}</Button>
                        <Button variant='contained'>End of Week</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactTable
                            columns={columns}
                            // data={data}
                            fetchData={fetchData}
                            //updateData={updateData}
                            disablePageResetOnDataChange={skipPageResetRef}
                            handleNew={handleNewData}
                            isEdit={isEdit}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TechHours