import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export default fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEV,
    prepareHeaders: (headers) => {
        const state = JSON.parse(localStorage.getItem('state'))   
        if(state.auth.token !== ''){
            headers.set('x-access-token',state.auth.token)
        }
        return headers
    }
})