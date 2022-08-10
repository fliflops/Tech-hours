import React from 'react';
import {useDispatch} from 'react-redux';

import {getData} from '../../../store/work-hours'

const Cell = ({
    value: initialValue,
    row,
    column,
    updateData
}) => {
    const dispatch = useDispatch()
    const [value,setValue] = React.useState(initialValue)
    const [roles,setRoles] = React.useState({
        role_id:null,
        role_name:null
    })
    const service_catalog = row.original.service_catalog
    const project_code = row.original.project_code

    React.useEffect(()=>{

        // if(service_catalog && project_code){
        //     console.log(row)
        //     dispatch(getData({
        //         route:`role/${project_code}`,
        //         filters:{
        //             project_service_catalog:service_catalog,
        //         }
                
        //     }))
        //     .unwrap()
        //     .then(result => {
        //         const data = result.data.employee_role
        //         setValue(data.role_name)
        //         // setRoles({
        //         //     role_id:data.role_id,
        //         //     role_name:data.role_name
        //         // })
                
        //         //pdateData(row.index, 'role_name', result.data.employee_role.role_name || null)
        //         // updateData(row.index, 'role_id', result.data.employee_role.role_id || null)
        //     })
        //}
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[service_catalog,project_code])

    React.useEffect(()=>{
       updateData(row.index,'role_id','test')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialValue])

    return (
        <div>{value}</div>
    )
}

export default Cell