import React from 'react'
import {Grid,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import Toolbar  from '../../../components/toolbar/Toolbar';
import {Table}  from '../../../components/table';
import {getData} from '../../../store/data-management';


export default function Projects() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.dataManagement)
    const navigate = useNavigate()
    

    const columns = React.useMemo(()=>[
        {
            Header:'Project Code',
            accessor:'project_code',
            Cell:props => {

                const handleDetails = () => {
                    navigate(`details/${props.value}`)
                }

                return <Button size='small' onClick={handleDetails}>
                    {props.value}
                </Button>
            }
        },
        {
            Header:'Project Name',
            accessor:'project_name'
        },
        {
            Header:'Project Type',
            accessor:'project_type'
        },
        {
            Header:'Sponsor',
            accessor:'project_sponsor'
        },
        {
            Header:'BU',
            accessor:'project_bu'
        },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ],[])
    
    const onCreate = () =>{
        navigate({
            pathname:'create'
        }) 
    }

    const fetchData = React.useCallback(({pageIndex,pageSize,filters},callBack)=>{
        dispatch(getData({
            route:'project-code',
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
            <Toolbar label='Project Codes' isCreate onCreate={onCreate}/>
        </Grid>
        <Grid item md={12} xs={12}>
            <Table 
                loading={loading}
                columns={columns}
                fetchData={fetchData}
            />
        </Grid>
      </Grid>
    )
}
