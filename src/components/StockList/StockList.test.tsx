import React from 'react'
import { screen, render } from '@testing-library/react'
import { TBody } from './StockList'
import { DragDropContext } from 'react-beautiful-dnd'


const dividends = [
    {
        countryCode: 'US',
        currency: 'CAD',
        description: 'My description',
        amount: 0.405,
        frequency: 'irregular',
        paymentDate: '2023-12-20',
        exDate: '2023-01-01'
    },
]

const onDragEnd = jest.fn()

const MockedTBody = () => (
    <DragDropContext onDragEnd={onDragEnd}>
        <TBody dividends={dividends} />
    </DragDropContext>
)

describe('StockList', () => {
    test('Rendering out right Elements', () => {
        render(
            <MockedTBody />
        )

        expect(screen.getAllByText(/US/i).length).toBeGreaterThan(1)
        expect(screen.queryByText(/RU/i)).not.toBeInTheDocument()
    })
})
