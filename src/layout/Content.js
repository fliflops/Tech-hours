import React from 'react';
import {Grid,Typography} from '@mui/material';
import {useLocation,useRoutes} from 'react-router-dom';
import {routes} from '../helpers';

function Content() {
    
	let location = useLocation();
    let elements = useRoutes(routes)
    // let match = useMatch(location.pathname)

	const [state,setState] = React.useState({
		header:'',
		subHeader:''
	})

	React.useEffect(()=>{
		const getHeaders = () => {
			let path = location.pathname.replace('/','')
            let arrayPath = path.split('/')

            if(path !== ''){
                setState({
                    ...state,
                    header:String(arrayPath[0]).toUpperCase(),
                    subHeader:path
                })
            }
		}
        
		getHeaders()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[location])

    return (
        <Grid container sx={{flexGrow:1 ,padding:2}}>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>{state.header}</Typography>
                <Typography variant='subtitle2' gutterBottom >{state.subHeader}</Typography>
            </Grid>
            <Grid item xs={12}>
                {elements}
            </Grid>
        </Grid>
    )
}

export default Content