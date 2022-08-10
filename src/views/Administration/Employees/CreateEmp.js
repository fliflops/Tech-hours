import React            from 'react';
import {Grid,Paper,Typography,Button}     from '@mui/material'; 
import {toast}          from 'react-toastify';
import {useSelector,useDispatch}               from 'react-redux';
import Toolbar          from '../../../components/toolbar/Toolbar';
import {Input}          from '../../../components/inputs';
import {MasterSelect}   from '../../../components/select';
import {Label}               from '../../../components/labels';
import {useNull}          from '../../../helpers'
import {createEmployee}               from '../../../store/employee/employee.slice';
import Spinner          from '../../../components/spinner/spinner'; 

function CreateEmp() {
    // const {useNull} = hooks;
    const [hasNull] = useNull();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.employee)
    const [state,setState] = React.useState({
        emp_first_name:null,
        emp_middle_name:null,
        emp_suffix:null,
        emp_last_name:null,
        emp_mobile_number:null,
        emp_employment_status:null,
        emp_nyx_user_id:null
    });

    const [controls,setControls] = React.useState({
        isCreated:false,
        status:''
    })

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    // const handleNumericChange = (e) => {
    //     setState({
    //         ...state,
    //         [e.target.name]:e.target.value.replace(/\D/,'')
    //     })
    // }

    const handleSelectChange = (e,name) => {
        setState({
            ...state,
            [name]:e
        })
    }

    const handleNew = () => {
        setControls({
            ...controls,
            isCreated:false,
            status:''
        })

        setState({
            ...state,
            emp_first_name:null,
            emp_middle_name:null,
            emp_suffix:null,
            emp_last_name:null,
            emp_mobile_number:null,
            emp_employment_status:null,
            emp_nyx_user_id:null
        }) 
    }

    const handleConfirm = () => {
        const {emp_suffix,...required} = state;
        const nulls = hasNull(required)
        
        if(nulls.length > 0){
            return toast.error(`${nulls.map(item => `${item}\n`).join(',')} is/are required!`)
        }

        dispatch(createEmployee({
            route:'',
            data:{
                ...state,
                emp_employment_status:state.emp_employment_status?.value || null,
                emp_nyx_user_id:state.emp_nyx_user_id?.value || null
            }
        }))
        .unwrap()
        .then(()=> {
            setControls({
                ...controls,
                isCreated:true,
                status:'ACTIVE'
            })
        })
    }

    return (
        <Grid container spacing={1}>
            <Spinner loading={loading}/>
            <Grid item md={12} xs={12}>
                <Toolbar label='Create User' isBack/>
            </Grid>
            <Grid item md={12} xs={12}>
                <Grid component={Paper} container item variant='container' md={12}>
                    <Grid item xs={12}><Typography variant='button'>Employee Information</Typography></Grid>
                    <Input isLabelVisible label='First Name'    handleChange={handleInputChange}        value={state.emp_first_name}        name='emp_first_name'/>
                    <Input isLabelVisible label='Middle Name'   handleChange={handleInputChange}        value={state.emp_middle_name}       name='emp_middle_name'   size={3}/>
                    <Input isLabelVisible label='Suffix'        handleChange={handleInputChange}        value={state.emp_suffix}            name='emp_suffix'        size={3}/>
                    <Input isLabelVisible label='Last Name'     handleChange={handleInputChange}        value={state.emp_last_name}         name='emp_last_name'/>
                    <Input isLabelVisible label='Contact #'     handleChange={handleInputChange}        value={state.emp_mobile_number}     name='emp_mobile_number' size={3}/>
                    <Label size={3} label='Status' value={controls.status}/>
                    <Grid item md={6} xs={12}>
                        <MasterSelect 
                            label='Employment Status'
                            type='quick-code'
                            filter='EMP_STATUS'
                            name='emp_employment_status'
                            value={state.emp_employment_status}
                            handleChange={handleSelectChange}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <MasterSelect 
                            label='Email'
                            type='user'
                            name='emp_nyx_user_id' 
                            value={state.emp_nyx_user_id}
                            handleChange={handleSelectChange}
                        />
                    </Grid>
                    <Grid item md={12} sx={{
                        marginTop:1,
                        display:'flex'
                    }}>
                        <div style={{flexGrow:1}}/>
                        <Button sx={{display: controls.isCreated ? 'visible':'none'}}  variant='contained' color='primary' onClick={handleNew}>New</Button>
                        <Button disabled={controls.isCreated} variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CreateEmp