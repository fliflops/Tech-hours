import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath:'selectApi',
    baseQuery: fetchBaseQuery({
        baseUrl:process.env.REACT_APP_API_DEV,
        prepareHeaders: (headers) =>{
            const state = JSON.parse(localStorage.getItem('state'))
            
            if(state.auth.token !== ''){
                headers.set('x-access-token',state.auth.token)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        selectData : builder.query({
            query: ({route,type}) => `select/${route}/${type}`
        }),
        projectRoleData : builder.query({
            query: ({route,filter}) => {
                return {
                    url:`wbs/work-hours/role/${route}`,
                    params:{
                        ...filter
                    }
                }
            }
        })
    })
})


export const {useSelectDataQuery,useProjectRoleDataQuery} =api