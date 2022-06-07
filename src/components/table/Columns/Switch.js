import React from 'react';
import Switch from '@mui/material/Switch';
// import {useTheme,Typography,FormControlLabel} from '@mui/material'


// import Switch from '../../switch'

function RenderSwitch({
    value: initialValue,
    row: { index },
    column: {id},
    updateData,
}) {
    const [state,setState] = React.useState(initialValue === 1 ? true:false)

    const handleChange = (e) => {
        
        setState(e.target.checked)
    }

    const onBlur= () => {
        updateData(index, id, state ? 1 : 0)
    }

    // React.useEffect(()=>{
    //     console.log(initialValue)
    // })

    return (        
        <Switch
            size='small'
            onChange={handleChange}
            onBlur={onBlur}
            checked={state}
            inputProps={{ 'aria-label': 'controlled' }}
        />

    )
}

export default RenderSwitch