import { IDividend } from "@my-types/types"
import React from "react"
import cl from './StockList.module.css'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'


interface StockListProps {
    dividends: IDividend[]
    setDividends: React.Dispatch<React.SetStateAction<IDividend[]>>
}

const StockIList: React.FC<StockListProps> = ({ dividends, setDividends }) => {

    const reorder = (list: IDividend[], startIndex: number, endIndex: number) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed as IDividend)
    
        return result
    }

    function onDragEnd(result: DropResult): void {
        if(!result.destination) return

        const reorderedItems = reorder(dividends, result.source.index, result.destination?.index as number)
    
        setDividends(reorderedItems as IDividend[])
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
        <h1 className={cl['app-title']}>The list of dividends</h1>

        <table className={cl['table']}  >
            <thead>
                <tr>
                    <th>Country Code</th>
                    <th>Currency</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                    <th>Payment Date</th>
                    <th>Ex-Date</th>
                </tr>
            </thead>

            <TBody dividends={dividends} /> {/* Компонент находится снизу, под этим компонентом */}
        </table>
        </DragDropContext>
    )
}

export const TBody: React.FC<{dividends: IDividend[]}> = ({ dividends }) => {

    function getDragItemStyle <T>(_: boolean, draggableStyle: T): T {
        return {
            padding: 16,
            margin: '0 0 8px 0',
            left: -100,
            ...draggableStyle
        }
    }

    return (
        <Droppable droppableId={'2'}>
        {(provided) => (
            <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {dividends?.map((dividend, index) => (
                    <Draggable 
                        key={index}
                        draggableId={index.toString()} 
                        index={index}
                    >
                        {(provided, snapshot) => (
                        <tr
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getDragItemStyle(snapshot.isDragging, provided.draggableProps.style)}

                            ref={provided.innerRef}
                            data-testid="stock-item"
                        >
                            <td>{dividend.countryCode}</td>
                            <td>{dividend.currency}</td>
                            <td>{dividend.description}</td>
                            <td>{dividend.amount}</td>
                            <td>{dividend.frequency}</td>
                            <td>{dividend.paymentDate}</td>
                            <td>{dividend.exDate}</td>
                        </tr>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </tbody>
        )}
        </Droppable>
    )
}

export default StockIList
