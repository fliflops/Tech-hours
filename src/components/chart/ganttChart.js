import React from 'react';
import {Chart} from 'react-google-charts';

const columns = [
  { type: "string", id: "Task" },
  { type: "date",   id: "Start" },
  { type: "date",   id: "End" },
];

const rows = [
  ["Washington",  new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams",       new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson",   new Date(1801, 2, 4), new Date(1809, 2, 4)],
];

const GanttChart = (props) => {
  const [data,setData] = React.useState([])

  React.useEffect(()=>{
    setData([
      columns,
      ...props.datasets
    ])
    
    // console.log([
    //   columns,...rows
    // ])
    
  },[props.datasets])

  return (
      <Chart
        chartType='Timeline'
        data={data}
        width="100%" 
        height="400px" 
      />
  )
}

export default GanttChart