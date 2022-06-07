import {createSlice} from '@reduxjs/toolkit';
import {getSelectData} from './select.thunk';

const initialState = {
    loading: false
}

const slice = createSlice({
    name:'select',
    initialState,
    reducers:{
        resetAction:()=>initialState,
    },
    extraReducers:{
        [getSelectData.pending]:(state,action)=>{
            state.loading=true
        },
        [getSelectData.rejected]:(state,action)=>{
            state.loading=false
        },
        [getSelectData.fulfilled]:(state,action)=>{
            state.loading=false
        }
    }
})

export default slice.reducer
export {getSelectData}