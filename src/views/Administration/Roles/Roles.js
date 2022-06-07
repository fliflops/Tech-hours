import React from 'react';
import {Grid,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import Toolbar  from '../../../components/toolbar';
import {Table}  from '../../../components/table';
import {getRole} from '../../../store/role';

function Roles() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.employee)  
  const columns = React.useMemo(()=>[
    {
      Header:'Role Name',
      accessor:'role_name',
      Cell:(props) => {
        const handleDetails = () => {
          const cell = props.cell.row.original
          navigate(`details/${cell.role_id}`)
        }
        return <Button size='small' onClick={handleDetails}>{props.value}</Button>
      }
    },
    {
      Header:'Description',
      accessor:'role_description'
    },
    {
      Header:'Role Status',
      accessor:'role_status'
    }
  ],[])

  const handleCreate = () => {
    navigate({
        pathname:'create'
    })
  }

  const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack)=> {
      dispatch(getRole({
        route:'',
        page:pageIndex,
        totalPage	:	pageSize,
			  orderBy		:	'createdAt,DESC',
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
          <Toolbar label='Roles' isCreate onCreate={handleCreate}/>
      </Grid>
      <Grid item md={12} xs={12}>
          <Table 
              columns={columns}
              loading={loading}
              fetchData={fetchData}
            />
      </Grid>
    </Grid>
  )
}

export default Roles