import {createSlice} from '@reduxjs/toolkit';
import {getData,createData,updateData} from './data-managment.thunk';

const initialState = {
    loading:false
}

const slice = createSlice({
    name:'data-management',
    initialState,
    reducers:{
        resetAction:()=>initialState
    },
    extraReducers:{
        [getData.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [getData.rejected]:(state,action)=>{
            state.loading=false
        },
        [getData.pending]:(state,action)=>{
            state.loading=true
        },
        [createData.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [createData.rejected]:(state,action)=>{
            state.loading=false
        },
        [createData.pending]:(state,action)=>{
            state.loading=true
        },
        [updateData.fulfilled]:(state,action)=>{
            state.loading=false
        },
        [updateData.rejected]:(state,action)=>{
            state.loading=false
        },
        [updateData.pending]:(state,action)=>{
            state.loading=true
        }
    }
})

export {getData,createData,updateData}
export default slice.reducer;
