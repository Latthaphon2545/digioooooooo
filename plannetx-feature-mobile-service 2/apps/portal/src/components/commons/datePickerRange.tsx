import moment from 'moment'
import DatePicker from 'react-datepicker'
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
  startDate: moment.Moment
  endDate: moment.Moment
  onDatesChange: (dates: {
    startDate?: moment.Moment
    endDate?: moment.Moment
  }) => void
}

const DateRangePickerWrapper = ({
  icon,
  startDate,
  endDate,
  onDatesChange
}: DateRangePickerWrapperProps) => {
  const theme = useSelector((state: useSelectorProps) => state.theme)
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <i className={icon} />
        <div className="daterange">
          <DatePicker
            selected={startDate.toDate()}
            onChange={(date: Date) => {
              onDatesChange({ startDate: moment(date) })
            }}
            startDate={startDate.toDate()}
            endDate={endDate.toDate()}
            maxDate={endDate.toDate()}
            dateFormat={'YYYY-MM-dd'}
          />
          <span>-</span>
          <DatePicker
            selected={endDate.toDate()}
            onChange={(date: Date) => {
              onDatesChange({ endDate: moment(date) })
            }}
            startDate={startDate.toDate()}
            endDate={endDate.toDate()}
            minDate={startDate.toDate()}
            dateFormat={'YYYY-MM-dd'}
          />
        </div>
        <style global jsx>
          {`
            .react-datepicker__input-container input {
              border: none;
              color: #0b2f5f;
              width: 100%;
            }

            .react-datepicker-wrapper,
            .react-datepicker__input-container {
              display: inline-block;
              margin: 0; /* Adjust as needed */
              width: fit-content; /* Adjust as needed */
            }

            .daterange {
              display: flex;
              flex-grow: 1;
              width: 100%;
            }
            .daterange span {
              padding: 0px 10px;
            }
            .daterange
              :global(
                .react-datepicker-wrapper
                  .react-datepicker__input-container
                  input
              ) {
              text-align: center;
            }

            .react-datepicker__input-container input:focus {
              // border: none;
              outline: none;
            }
          `}
        </style>
      </Container>
    </ThemeProvider>
  )
}

export default DateRangePickerWrapper
