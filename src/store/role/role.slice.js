import {createSlice} from '@reduxjs/toolkit';
import {createRole,getRole} from './role.thunk';

const initialState = {
    loading:false,
}

const slice = createSlice({
    name:'role',
    initialState,
    reducers:{
        resetAction: ()=>initialState
    },
    extraReducers:{
        [getRole.fulfilled]:(state,action)=>{
            state.loading = false
        },
        [getRole.pending]:(state,action)=>{
            state.loading = true  
        },
        [getRole.rejected]:(state,action)=>{
            state.loading = false
        },
        
        [createRole.fulfilled]:(state,action)=>{
            state.loading = false
        },
        [createRole.pending]:(state,action)=>{
            state.loading = true
        },
        [createRole.rejected]:(state,action)=>{
            state.loading = false
        }
    }
})

export default slice.reducer;
export {getRole,createRole}