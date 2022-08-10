import {createApi} from '@reduxjs/toolkit/query/react';
import {rtkAPI} from '../../helpers'

const api = createApi({
    reducerPath:'techHoursApi',
    baseQuery: rtkAPI,
    endpoints:(builder) => ({
        createTechHours: builder.mutation({
            query: (data) => ({
                url: 'tech-hours',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useCreateTechHoursMutation} = api
export default api