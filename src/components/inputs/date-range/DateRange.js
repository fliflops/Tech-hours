import React from 'react';
import {Grid} from '@mui/material';
import DatePicker from '../date-picker';
// import DateAdapter from '@mui/lab/AdapterMoment';
// import {DatePicker as MUIDatePicker,LocalizationProvider} from '@mui/lab'

// import {DateRange as Range} from 'react-date-range'

const DateRange = ({
    from,
    to,
    handleChange
}) => {

    return (
        <Grid container>
            <DatePicker
                isLabelVisible
                label='from'
                name='from'
                value={from}
                handleChange={handleChange}
            />
            <DatePicker
                isLabelVisible
                label='to'
                name='to'
                value={to}
                handleChange={handleChange}
            />

        </Grid>
    )
}

DateRange.defaultProps = {
    from:null,
    to:null,
    value:null,
    handleChange:()=>{}
}

export default DateRange