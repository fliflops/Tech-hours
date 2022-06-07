import React from 'react';
// import {useSelector} from 'react-redux'
import {CircularProgress} from '@mui/material';

function Spinner({loading}) {
    return (
        <div>
        {loading ? 
        <div style={{
            position:'fixed',
            display:'block',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:'rgba(255, 255, 255, 0.5)',
            zIndex:2,
            width: '100%',
            height: '100%'
        }}>
            <div style={{
                position:'absolute',
                top:'50%',
                left:'50%',
                transform: 'translate(-50%,-50%)'
            }}>
                <CircularProgress
                    size={40}
                />
            </div>  
        </div>:null}
    </div>
    );
}

Spinner.defaultProps = {
    loading:false
}

export default Spinner;