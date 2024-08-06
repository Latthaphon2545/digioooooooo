import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider, css } from 'styled-components'
import { useSelectorProps } from '../../props/useSelectorProps'

const Container = styled.div<{ $isinvalid: boolean }>`
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
  > input {
    display: block;
    padding: 0px;
    width: 100%;
    height: auto;
    border: none;
    font-size: 0.875em;
    color: #0b2f5f;
    background: transparent;
    outline: none;
    transition: all 0.2s;
  }
  > input::placeholder {
    color: #92a3b9;
  }
  &:focus-within {
    background-color: #fff;
    border: 2px solid ${(props) => props.theme.ACCENT_COLOR};
    box-shadow: 0px 5px 10px ${(props) => props.theme.ACCENT_SHADOW_COLOR};
    > i {
      color: ${(props) => props.theme.ACCENT_COLOR};
    }
    > input {
      color: ${(props) => props.theme.ACCENT_COLOR};
    }
  }
  ${(props) =>
    props.$isinvalid &&
    css`
      border: 2px solid #ea5455;
      box-shadow: 0px 5px 10px rgba(234, 84, 85, 0.2);
      > i {
        color: #ea5455;
      }
      > input {
        color: #ea5455;
      }
      &:focus-within {
        border: 2px solid #ea5455;
        box-shadow: 0px 5px 10px rgba(234, 84, 85, 0.2);
        > i {
          color: #ea5455;
        }
        > input {
          color: #ea5455;
        }
      }
    `}
`

interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  value?: string | number | string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

type Ref = HTMLDivElement

const Input = forwardRef<Ref, PropsInput>((props, ref) => {
  const { icon, value, onChange, type } = props
  const theme = useSelector((state: useSelectorProps) => state.theme)
  const [isInvalid, setIsInvalid] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <Container $isinvalid={isInvalid} ref={ref}>
        {icon ? <i className={icon} /> : null}
        <input
          {...props}
          value={value}
          type={type}
          onChange={onChange}
          onInvalid={() => {
            setIsInvalid(true)
            setTimeout(() => {
              setIsInvalid(false)
            }, 2000)
          }}
          onKeyPress={() => setIsInvalid(false)}
        />
      </Container>
    </ThemeProvider>
  )
})

export default Input
