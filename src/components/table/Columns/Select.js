import React from 'react';
import ReactSelect from 'react-select/async';
import {useSelectDataQuery} from '../../../store/select/select.query';
import {useDispatch} from 'react-redux';

import {getData} from '../../../store/work-hours'

const Select = ({
    value: initialValue,
    row,
    column,
    updateData,
    columnValue,
    route,
    type
}) => {
    const dispatch = useDispatch();
    const [options,setOptions] = React.useState([])
    const [selected,setSelected] = React.useState(initialValue ? {
        value:row.original['columnValue'],
        label:initialValue
    } : null)

    const {data,isLoading,isSuccess,refetch} = useSelectDataQuery({route,type});
    
    const handleSelectChange = (value) => {
        setSelected(value)
        updateData(row.index,column.id,value?.label || null)
        updateData(row.index,columnValue,value?.value || null)
        
        if(column.id === 'service_catalog_name' && row.original.project_code){
            dispatch(getData({
                route:`role/${row.original.project_code}`,
                filters:{
                    project_service_catalog: typeof value?.value === 'undefined' ? '' : value?.value
                }
            }))
            .unwrap()
            .then(result => {
                const data = result.data?.employee_role
                
                updateData(row.index, 'role_name', data?.role_name || null)
                updateData(row.index, 'role_id', data?.role_id || null)
            })
        }
    }


    React.useEffect(()=>{
        refetch()

        if(isSuccess){
            setOptions(data?.data || [])
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialValue,isSuccess])

    return (
        <div style={{flexGrow:1}}>
            <ReactSelect
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            isLoading={isLoading}
            defaultOptions={options.length < 100 ? options : []}
            value={selected}
            onChange={handleSelectChange}
            isClearable
            menuPortalTarget={document.body}
        />
        </div>
    )
}

Select.defaultProps = {
    type:''
}

export default Select