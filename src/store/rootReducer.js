import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import select from './select';
import employee from './employee';
import role from './role';
import calendar from './calendar';
import dataManagement from './data-management';
import workHours from './work-hours';
import {api} from './select/select.query';

const combinedReducers = combineReducers({
    auth:           auth,
    select:         select,
    employee:       employee,
    role:           role,
    calendar:       calendar,
    dataManagement: dataManagement,
    workHours:      workHours,
    [api.reducerPath]: api.reducer,
})

const rootReducer = (state,action) => {
    if(action.type === 'authentication/sign-out/fulfilled'){
        state={}
    }
    return combinedReducers(state,action)
}


export const {getData,createData} = dataManagement;
export const {middleware} = api;
export default rootReducer

