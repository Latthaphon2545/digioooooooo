import React from 'react'
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
  > select {
    appearance: none;
    padding: 0px;
    display: block;
    width: 100%;
    height: auto;
    border: none;
    font-size: 0.875em;
    color: #0b2f5f;
    background: transparent;
    outline: none;
    transition: all 0.2s;
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
`

interface SelectProps
  extends React.HTMLAttributes<HTMLSelectElement | HTMLOptionElement> {
  icon: string
  value?: string | number | string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
  disabled?: boolean
  required?: boolean
}

const Select = ({
  icon,
  value,
  onChange,
  children,
  disabled,
  required
}: SelectProps) => {
  const theme = useSelector((state: useSelectorProps) => state.theme)

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <i className={icon} />
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          {children}
        </select>
      </Container>
    </ThemeProvider>
  )
}

export default Select
