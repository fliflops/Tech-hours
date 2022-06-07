import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Select from 'react-select/async';
import {useTheme,Typography} from '@mui/material';

import {getSelectData} from '../../../store/select';

function MasterSelect({
    label,
    type,
    filter,
    name,
    value,
    isDisabled,
    handleChange
}) {
    const theme = useTheme()
    const [options,setOptions] = React.useState([])
    const {loading} = useSelector(state => state.select)
    const dispatch = useDispatch();

    const filterSelect = (inputValue)=>{
        return options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }
    
    React.useEffect(()=>{
        dispatch(getSelectData({
            route:type,
            type:filter
        }))
        .unwrap()
        .then(result => {
            setOptions(result)
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type])

    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1),        
        }}> 
            <Typography variant='overline'>{label}</Typography>
            <Select
                isDisabled={isDisabled}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                //styles={{menu: provided => ({...provided,zIndex: 9999})}}
                placeholder={label}
                isLoading={loading}
                defaultOptions={options.length < 100 ? options : []}
                loadOptions={(inputValue,callBack)=>{
                    setTimeout(() => {
                        callBack(filterSelect(inputValue))
                    },500) 
                }}
                value={value}
                onChange={e => handleChange(e,name)}
                isClearable
                menuPortalTarget={document.body}
            />
        </div>
    )
}

MasterSelect.defaultProps = {
    type:'',
    filter:'',
    label:'',
    name:'',
    value:'',
    isDisabled:false,
    handleChange:()=>{}
}

export default MasterSelect