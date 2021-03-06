import { Button } from '@material-ui/core'
import React from 'react'
import { DateRangePicker } from 'react-date-range'
import * as locales from 'react-date-range/dist/locale'

const DateRange = ({ date, onRangeChange, onSelectAll }) => {
    React.useEffect(() => {
        return () => {
            console.log('unmount')
        }
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0 10px 10px' }}>
                <Button variant='contained' color='primary' onClick={onSelectAll}>
                    Ver Todo
                </Button>
            </div>
            <DateRangePicker
                editableDateInputs={true}
                onChange={item => {
                    onRangeChange(item)
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
                locale={locales.es}
                maxDate={new Date()}
                color='rgb(0, 119, 114)'
            />
        </div>
    )
}

export default DateRange
