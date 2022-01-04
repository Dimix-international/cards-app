import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "./auth-api";


export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: axiosBaseQuery(
        {baseUrl: 'https://dry-forest-56016.herokuapp.com'}
    ),
    tagTypes:['File'],
    endpoints:(builder) =>({
        getFile: builder.query({
            query:(arg) => ({
                url:'file',
                method: 'GET'
            })
        }),
        createFile: builder.mutation<void, {myFile:string}>({
            query:(arg) => ({
                url:'file',
                data: {formData : arg},
                method: 'GET',
            })
        })
    })
})

export const {useGetFileQuery, useCreateFileMutation} = fileApi;