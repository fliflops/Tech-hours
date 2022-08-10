import React from 'react'
import {Grid,Button,Paper} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import Toolbar  from '../../../components/toolbar/Toolbar';
import {ReactTable}  from '../../../components/table';
import {getData} from '../../../store/data-management';

function ServiceCatalog() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    
    const navigate = useNavigate()
    const columns = React.useMemo(()=>[
      {
        Header:'Service Catalog',
        accessor:'cat_name',
        Cell: props => {
          const handleDetails = () => {
            const cell = props.cell.row.original
            navigate(`details/${cell.catalog_id}`)
          } 
          return <Button size='small' onClick={handleDetails}>{props.value}</Button>
        }
      },
      {
        Header:'Status',
        accessor:'cat_status'
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    const onCreate = () => {
        navigate({
          pathname:'create'
      }) 
    }

    const fetchData = React.useCallback(({pageIndex,pageSize,orderBy,filters}, callBack) => {
      dispatch(getData({
        route:'service-catalog',
        page:pageIndex,
        totalPage	:	pageSize,
			  orderBy,
        filters		:	filters
      }))
      .unwrap()
		  .then(result => {
			  callBack(result)
		  })  
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
            <Toolbar label='Service Catalogs' isCreate onCreate={onCreate}/>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} component={Paper} variant='container'>
            <ReactTable 
              loading={loading}
              columns={columns}
              fetchData={fetchData}
            />
          </Grid>
          
        </Grid>
      </Grid>   
    )
}

export default ServiceCatalog