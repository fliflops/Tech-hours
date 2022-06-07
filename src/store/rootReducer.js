import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import select from './select';
import employee from './employee';
import role from './role';
import calendar from './calendar';
import dataManagement from './data-management';

const combinedReducers = combineReducers({
    auth:       auth,
    select:     select,
    employee:   employee,
    role:       role,
    calendar:   calendar,
    dataManagement: dataManagement
})

const rootReducer = (state,action) => {
    if(action.type === 'authentication/sign-out/fulfilled'){
        state={}
    }
    return combinedReducers(state,action)
}

export const {getData,createData} = dataManagement
export default rootReducer
