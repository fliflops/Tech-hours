import {createSlice} from '@reduxjs/toolkit';
import {getCalendar,createCalendar} from './calendar.thunk';

const initialState = {
    loading:false
}

const slice = createSlice({
    name:'calendar',
    initialState,
    reducers:{
        resetAction:()=>initialState
    },
    extraReducers:{
        [getCalendar.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [getCalendar.pending]:(state,action)=>{
            state.loading=true
        },
        [getCalendar.rejected]:(state,action)=>{
            state.loading=false
        },
        [createCalendar.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [createCalendar.pending]:(state,action)=>{
            state.loading=true
        },
        [createCalendar.rejected]:(state,action)=>{
            state.loading=false
        },

    }
})

export default slice.reducer;
export {getCalendar,createCalendar}