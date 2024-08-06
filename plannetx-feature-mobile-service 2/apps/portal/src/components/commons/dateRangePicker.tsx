import moment from 'moment'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { useSelectorProps } from '../../props/useSelectorProps'

const Container = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: center;
  width: auto;
  height: 35px;
  background-color: #fafbfd;
  border: 2px solid #e2e9f2;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  > i {
    margin-right: 10px;
    color: #92a3b9;
    transition: all 0.2s;
  }
  &:focus-within {
    background-color: #fff;
    border: 2px solid ${(props) => props.theme.ACCENT_COLOR};
    box-shadow: 0px 5px 10px ${(props) => props.theme.ACCENT_SHADOW_COLOR};
    > i {
      color: ${(props) => props.theme.ACCENT_COLOR};
    }
  }
`

interface DateRangePickerWrapperProps {
  icon: string
  minDate?: moment.Moment
  maxDate?: moment.Moment
  startDate: moment.Moment
  endDate: moment.Moment
  onDatesChange: (dates: {
    startDate?: moment.Moment
    endDate?: moment.Moment
  }) => void
}

const DateRangePickerWrapper = ({
  icon,
  minDate,
  maxDate,
  startDate,
  endDate,
  onDatesChange
}: DateRangePickerWrapperProps) => {
  const theme = useSelector((state: useSelectorProps) => state.theme)
  const [focusedInput, setFocusedInput] = useState(null)

  const handleSelect = (ranges: {
    [key: string]: { startDate: Date; endDate: Date }
  }) => {
    onDatesChange({
      startDate: moment(ranges.selection.startDate),
      endDate: moment(ranges.selection.endDate)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <i className={icon} />
        <DateRangePicker
          ranges={[
            {
              startDate: startDate.toDate(),
              endDate: endDate.toDate(),
              key: 'selection'
            }
          ]}
          minDate={minDate?.toDate()}
          maxDate={maxDate?.toDate()}
          onChange={handleSelect}
          months={2}
          direction="horizontal"
          showMonthAndYearPickers={true}
        />
        <style global jsx>
          {`
            .DateRangePicker {
              flex-grow: 1;
            }
            .DateRangePicker .DateRangePickerInput,
            .DateRangePicker .DateInput,
            .DateRangePicker .DateInput_input {
              background: transparent;
            }
            .DateRangePicker .DateInput {
              width: auto;
            }
            .DateRangePicker .DateInput_fang {
              top: 36px !important;
            }
            .DateRangePicker .DateInput_input {
              display: block;
              width: 90px;
              padding: 0px;
              font-weight: normal;
              font-size: 0.875em;
              text-align: center;
              color: #0b2f5f;
              border-bottom: 0px;
            }
            .DateRangePicker .DateInput_input::placeholder {
              color: #92a3b9;
            }
            .DateRangePicker .DateRangePickerInput_arrow {
              margin: 0px 10px;
              color: #92a3b9;
            }
            .DateRangePicker .DateInput_input__focused {
              border-bottom: 0px;
            }

            .DateRangePicker .CalendarDay__selected {
              background: #1478fe;
              border: 1px solid #1478fe;
            }
            .DateRangePicker .CalendarDay__selected_span {
              background: #7bb3ff;
              border: 1px solid #69a9ff;
            }
          `}
        </style>
      </Container>
    </ThemeProvider>
  )
}

export default DateRangePickerWrapper
