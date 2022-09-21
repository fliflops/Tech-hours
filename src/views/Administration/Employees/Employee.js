import React from 'react';
import {Grid,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import Toolbar  from '../../../components/toolbar/Toolbar';
import {Table}  from '../../../components/table';
import {getEmployee} from '../../../store/employee/employee.slice'

function Employee() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.employee)
    const columns = React.useMemo(()=>[
        {
            Header:'Email',
            accessor:'user_email',
            Cell: props => {
                const handleDetails=()=>{
                    const cell = props.row.original
                    navigate(`details/${cell.emp_id}`)
                }

                return (
                    <Button size='small' onClick={handleDetails}>{props.value}</Button>
                )
            }
        },
        {
            Header:'First Name',
            accessor:'emp_first_name',
           
        },
        {
            Header:'Middle Name',
            accessor:'emp_middle_name'
        },
        {
            Header:'Last Name',
            accessor:'emp_last_name'
        },
        {
            Header:'Suffix',
            accessor:'emp_suffix'
        },
        {
            Header:'Status',
            accessor:'emp_status'
        },
        {
            Header:'Employee Status',
            accessor:'emp_employment_status'
        },
        {
            Header:'Mobile #',
            accessor:'emp_mobile_number'
        },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])

    const handleCreate = () => {
        navigate({
            pathname:'create'
        })
    }

    const fetchData = React.useCallback(({pageIndex,pageSize,filters}, callBack)=>{
        dispatch(getEmployee({
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
                <Toolbar label='Users' isCreate onCreate={handleCreate}/>
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


export default Employee