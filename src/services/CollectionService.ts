import { IDividend } from '@my-types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const dividendsAPI = createApi({
    reducerPath: 'dividendsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cloud.iexapis.com' }),
    endpoints: (build) => ({
        getDividends: build.query<IDividend[], number>({
            query: (range) => ({
                url: `/stable/time-series/advanced_dividends`,
                params: {
                    /* 
                        С имитриовал переключение по страницам таким образом 
                        так как API не предоставляет возможность переключение по page
                        как это делает json placeholder
                    */

                    range: range === 1 ? 'last-week'
                    : range === 2 ? '1y'
                    : '2y',

                    limit: 10,
                    token: process.env.API_TOKEN
                }
            })
        })
    })
})

export const { useGetDividendsQuery } = dividendsAPI
