import React from 'react';
import {Grid,Paper} from '@mui/material';
// import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import Toolbar from '../../../components/toolbar/Toolbar';
import CreateCalendarDialog from './CreateCalendarDialog';
// import {Label} from '../../../components/labels';
// import {DatePicker} from '../../../components/inputs';
import {getCalendar} from '../../../store/calendar';
import {SimpleTable} from '../../../components/table';

function Calendar() {
    const dispatch = useDispatch()
    // const {loading} = useSelector(state => state.calendar)
    const [dialog,setDialog] = React.useState(false);
    // const [filters,setFilters] = React.useState({
    //     date:new Date()
    // })

    const [calendar,setCalendar] = React.useState([]);

    const columns = React.useMemo(()=>[
        {
            Header:'Date',
            accessor:'holiday_date',
            Cell:props => moment(props.value).format('YYYY-MM-DD')
        },
        {
            Header:'Holiday Name',
            accessor:'holiday_name',

        },
    ],[])
    
    // const handleFilterChange = (e) => {
    //     console.log(e.target.value)
    //     setFilters({
    //         ...filters,
    //         [e.target.name]:e.target.value
    //     })
    // }

    React.useEffect(() => {
        dispatch(getCalendar({
            route:'',
            filters:{
                //holiday_month: filters.date
            }
        }))
        .unwrap()
        .then(result => {
            setCalendar(result.data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
                <Toolbar 
                    label='Calendar' 
                    isCreate 
                    onCreate={()=>{setDialog(!dialog)}}
                />
            </Grid>
            <Grid item md={12} xs={12}>
                <Grid component={Paper} variant='container' container>
                    {/* <Label size={3} value={filters.year} label='Year'/> */}
                    {/* <Grid item md={12} xs={12}>
                        <DatePicker views={['month','year']} label={'Month'} size={12} value={filters.date} name='date' handleChange={handleFilterChange}/>
                    </Grid> */}
                    <Grid item md={12} xs={12}>
                        <SimpleTable 
                            columns={columns}
                            data={calendar}
                            size={12}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <CreateCalendarDialog isOpen={dialog} toggle={()=>{setDialog(!dialog)}}/>
        </Grid>
    )
}

export default Calendar