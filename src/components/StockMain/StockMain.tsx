import React from "react"
import '../../App.css'
import cl from './StockMain.module.css'
import { useGetDividendsQuery } from "@/services/CollectionService"
import StockList from "@components/StockList/StockList"
import { IDividend } from "@my-types/types"

const StockMain: React.FC = () => {

    const [dividends, setDividends] = React.useState<IDividend[]>([])
    const [page, setPage] = React.useState<number>(0)
    const { data, error, isLoading, isFetching } = useGetDividendsQuery(page)

    React.useEffect(() => {
        setDividends(data as IDividend[])
    }, [data])

    function nextPage(): void {
        if(page <= 2)
            setPage((prev) => prev + 1)
    }

    function prevPage(): void {
        if(page)
            setPage((prev) => prev - 1)
    }

    if(error) {
        return (
            <>
                <div className="error">Произошла ошибка...</div>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </>
        )
    }

    if(isLoading || isFetching) {
        return ( 
            <div className="loader">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        <>
            <StockList dividends={dividends} setDividends={setDividends}/>

            <div className={cl['buttons']}>
                {page ?
                    <button 
                        className={cl['button']}
                        onClick={prevPage}
                    >Prev</button>
                    :
                    <></>
                }

                {page <= 2 && 
                    <button 
                        className={cl['button']}
                        onClick={nextPage}
                    >Next</button>
                } 
            </div>
        </>
    )
}

export default StockMain
