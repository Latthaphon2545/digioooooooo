import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import Input from './input'

interface MyDatePickerProps {
  selected: Date
  onChange: (date: Date) => void
}

const MyDatePicker = ({ selected, onChange }: MyDatePickerProps) => {
  return (
    <>
      <DatePicker
        selected={selected}
        onChange={onChange}
        customInput={<Input icon="fas fa-calendar" />}
      />
      <style jsx global>
        {`
          .react-datepicker-wrapper {
            display: block;
          }
        `}
      </style>
    </>
  )
}

MyDatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
}

export default MyDatePicker
