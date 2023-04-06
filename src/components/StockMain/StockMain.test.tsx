import React from 'react'
import { render, fireEvent } from '@testing-library/react'


describe('StockMain Test', () => {
    test('Next works correctly', async () => {
        const onClick = jest.fn()
        const { getByText } = render(<button onClick={onClick}>next</button>)

        fireEvent.click(getByText(/next/i))
        expect(onClick).toHaveBeenCalled()
    })
})
