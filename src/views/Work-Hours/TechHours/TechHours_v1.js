import React from 'react';
import {Grid,Paper,Button} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux';
import moment from 'moment'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import {ReactTable} from '../../../components/table';
import Toolbar from '../../../components/toolbar';
import Spinner from '../../../components/spinner';
import {DatePicker} from '../../../components/inputs';

import {getData} from '../../../store/work-hours';
import TechHourDetails from './TechHourDetails';


function TechHours() {
    const {loading} = useSelector(state => state.workHours);
    const dispatch  = useDispatch();
    const [data,setData] = React.useState([])

    const [filters,setFilters] = React.useState({
        from:moment().startOf('month'),
        to:moment().endOf('month')
    })

    const columns = React.useMemo(()=>[
        {
            Header:'Project Code',
            accessor:'project_code',
            Cell: props => (
                <div 
                {...props.row.getToggleRowExpandedProps()}
                style={{
                    display:'flex',
                    width:'100%',
                    cursor:'pointer'
                }}>
                    <span style={{flexGrow:1}}>{props.value}</span>
                    {props.row.isExpanded ? <ExpandLess/> : <ExpandMore/>}
                </div>
            )
        },
        {
            Header:'Project Name',
            accessor:'project_name'
        },
        {
            Header:'Role',
            accessor:'role_name'
        },
        {
            Header:'Service Catalog',
            accessor:'cat_name'
        },
        {
            Header:'Planned Start Date',
            accessor:'project_planned_date',
            Cell:props => moment(props.value).format('YYYY-MM-DD')
        },
        {
            Header:'Go Live Date',
            accessor:'project_go_live',
            Cell:props => moment(props.value).format('YYYY-MM-DD')   
        },
        {
            Header:'Remarks',
            accessor:'remarks'
        },
    ],[])

    const refreshData = () => {
        dispatch(getData({
            route:'project',
            filters:{
                from:moment(filters.from).format('YYYY-MM-DD'),
                to:moment(filters.to).format('YYYY-MM-DD')
            }
        }))
        .unwrap()
        .then(result => {
            // console.log(result.projects)
           setData(result.projects)
        })
    }

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name] : e.target.value
        })
    }

    React.useEffect(()=>{
        refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters.from,filters.to])

    return (
        <Grid container spacing={1}>
            <Spinner loading={loading}/>
                <Grid item md={12} xs={12}>
                    <Toolbar label='Tech Hours'/>
                </Grid>
                <Grid item md={12} xs={12}>
                <Grid component={Paper} container item variant='container' md={12}>
                    <Grid item container xs={12}>
                        <DatePicker label='Planned Date From'   name='from' value={filters.from} size={3} isLabelVisible handleChange={handleFilterChange}/>
                        <DatePicker label='Planned Date to'     name='to'   value={filters.to}   size={3} isLabelVisible handleChange={handleFilterChange}  />
                    </Grid>
                    <Grid item xs={12} component='div' sx={{display:'flex', paddingBottom:1,paddingTop:1}}>
                        <div style={{flexGrow:1}}/>
                        <Button variant='contained'>End of Week</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactTable 
                            columns={columns}
                            data={data}
                            subComponent={TechHourDetails}
                        />
                    </Grid>
                </Grid>    
            </Grid>
        </Grid>
    )
}

export default TechHours