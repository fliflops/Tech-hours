import React from 'react';
// import {useDispatch} from 'react-redux';
import {default as AsyncSelect} from 'react-select/async';
import {useTheme,Typography} from '@mui/material';
import * as constants from './constants';

const Select = ({
    label,
    type,
    name,
    value,
    isDisabled,
    handleChange
}) => {
    const theme = useTheme()
    const [options,setOptions] = React.useState([])

    const filterSelect = (inputValue)=>{
        return options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }

    React.useEffect(() => {
        if(constants[type]){
            setOptions(constants[type])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    
    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1),        
        }}> 
            <Typography variant='overline'>{label}</Typography>
            <AsyncSelect
                isDisabled={isDisabled}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                //styles={{menu: provided => ({...provided,zIndex: 9999})}}
                placeholder={label}
                // isLoading={loading}
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

Select.defaultProps = {
    type:'',
    filter:'',
    label:'',
    name:'',
    value:'',
    isDisabled:false,
    handleChange:()=>{}
}

export default Select