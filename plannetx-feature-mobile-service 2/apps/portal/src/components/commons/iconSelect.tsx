import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider, css } from 'styled-components'
import { useSelectorProps } from '../../props/useSelectorProps'

const Container = styled.div`
  display: flex;
  margin: -10px;
`

const Option = styled.div<{ selected: boolean }>`
  margin: 10px;
  position: relative;
  padding: 10px 20px;
  width: 100px;
  height: 100px;
  background-color: #fafbfd;
  border: 2px solid #e2e9f2;
  border-radius: 10px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  > img {
    width: 100%;
    height: auto;
  }
  > label {
    position: absolute;
    left: 0px;
    bottom: 0px;
    padding: 5px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
  ${(props) =>
    props.selected &&
    css`
      border: 2px solid ${(props) => props.theme.ACCENT_COLOR};
      box-shadow: 0px 5px 10px ${(props) => props.theme.ACCENT_SHADOW_COLOR};
      > label {
        color: ${(props) => props.theme.ACCENT_COLOR};
      }
    `}
`

interface IconSelectProps {
  options: {
    iconIdle: string
    iconActive: string
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
}

const IconSelect = ({ options, value, onChange }: IconSelectProps) => {
  const theme = useSelector((state: useSelectorProps) => state.theme)
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {options.map((option, index) => {
          return (
            <Option
              onClick={() => onChange(option.value)}
              selected={value === option.value}
              key={index}
            >
              <img
                src={
                  value === option.value ? option.iconActive : option.iconIdle
                }
              />
              <label>{option.label}</label>
            </Option>
          )
        })}
      </Container>
    </ThemeProvider>
  )
}

IconSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default IconSelect
