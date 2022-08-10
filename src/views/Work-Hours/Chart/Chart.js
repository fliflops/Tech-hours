import React from 'react';
import {Grid,Paper} from '@mui/material';
import {useSelector,useDispatch} from 'react-redux';

import Toolbar from '../../../components/toolbar';
import {GanttChart} from '../../../components/chart';
import {DateRange} from '../../../components/inputs';

import {getData} from '../../../store/work-hours';
import _ from 'lodash';
import moment from 'moment';

const Chart = () => {
  const dispatch = useDispatch();
  const [chartData,setChartData] = React.useState({
    data:[]
  })

  const [filters,setFilters] = React.useState({
    from:null,
    to:null
  })

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:e.target.value
    })
  }

  const fetch = () => {
    dispatch(getData({
      route:'chart',
      filters:{
        from: moment(filters.from).format('YYYY-MM-DD'),
        to: moment(filters.to).format('YYYY-MM-DD')
      }
    }))
    .unwrap()
    .then(result => {

      const data = result.data.map(item => {
        return [item.l3_catalog,new Date(moment.utc(item.planned_date).format('YYYY-MM-DD HH:mm:ss')), new Date(moment.utc(item.planned_date).add(parseInt(item.planned_duration),'hours').format('YYYY-MM-DD HH:mm:ss'))]
      })
      
      setChartData({
        ...chartData,
        data
      })   
      
      console.log(data)
    })
  }


  React.useEffect(()=>{
    console.log(filters)
    if(filters.from && filters.to){
      fetch()
    }
    else{
      setChartData({
        ...chartData,
        data:[]
      })   
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filters.from,filters.to])

  return (
    <Grid container spacing={1}>
      {/* <Spinner loading={loading}/> */}
      <Grid item xs={12}>
        <Toolbar label='Gantt Chart' />
      </Grid>
      <Grid item xs={12}>
        <Grid item container xs={12} component={Paper} variant='container'>
          <Grid item xs={6}>
            <DateRange
              from={filters.from}
              to={filters.to}
              handleChange={handleChange}
            />
          </Grid>
          <GanttChart
            datasets={chartData.data}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Chart