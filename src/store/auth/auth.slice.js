import {createSlice} from '@reduxjs/toolkit';
import {getUser,signOut} from './auth.thunk'

const initialState = {
    user_email: '',
    user_id:    '',
    token:      '',
    role:       '',
    loading:    false,
    modules:    []
}

const slice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        resetAction:()=>initialState,
        setAuth: (state,action)=>{
            state.token=action.payload.token
        }
    },
    extraReducers:{
        [getUser.fulfilled]:(state,action)=>{
            state.loading=false
            //console.log(action.payload)
            if(action.payload){
                const data = action.payload
                state.user_email = data.user_email
                state.user_id = data.user_id
                // state.role = data.
                // state.modules
            }
        },
        [getUser.pending]:(state,action)=>{
            state.loading=true
        },
        [getUser.rejected]:(state,action)=>{
            state.loading=false
        },
        [signOut.fulfilled]:(state,action)=>{
           
        },
        [signOut.pending]:(state,action)=>{

        },
        [signOut.rejected]:(state,action)=>{

        },

    }
})

export default slice.reducer
export {getUser,signOut}
export const {setAuth}  = slice.actions

