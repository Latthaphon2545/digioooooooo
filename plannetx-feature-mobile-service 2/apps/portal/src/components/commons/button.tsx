import { useSelector } from 'react-redux'
import styled, { ThemeProvider, css } from 'styled-components'
import { useSelectorProps } from '../../props/useSelectorProps'
import { ReactNode } from 'react'

interface ButtonProps {
  $primary?: boolean
  hidden?: boolean
  $secondary?: boolean
  $success?: boolean
  $danger?: boolean
  primaryalt?: boolean
  successalt?: boolean
  dangeralt?: boolean
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: string
}

const Button = styled.button.attrs<ButtonProps>((props) => ({
  $primary: props.$primary ?? true
}))<
  ButtonProps & {
    $hidden?: boolean
    $primary?: boolean
    $secondary?: boolean
    $success?: boolean
    $danger?: boolean
    $primaryalt?: boolean
    $successalt?: boolean
    $dangeralt?: boolean
  }
>`
  display: block;
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  &:disabled:hover {
    cursor: default;
  }
  > i {
    margin-right: 5px;
  }
  ${(props) =>
    props.$hidden &&
    css`
      display: none;
    `}
  ${(props) =>
    props.$primary &&
    css`
      color: #fff;
      background-color: ${props.theme.ACCENT_COLOR};
      box-shadow: 0px 5px 10px ${props.theme.ACCENT_SHADOW_COLOR};
    `}
  ${(props) =>
    props.$secondary &&
    css`
      color: #0b2f5f;
      background-color: #fff;
      border: 2px solid #e2e9f2;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    `}
  ${(props) =>
    props.$success &&
    css`
      color: #fff;
      background-color: #2fa12d;
      box-shadow: 0px 5px 10px rgba(47, 161, 45, 0.2);
    `}
  ${(props) =>
    props.$danger &&
    css`
      color: #fff;
      background-color: #e32319;
      box-shadow: 0px 5px 10px rgba(234, 84, 85, 0.2);
    `}
  ${(props) =>
    props.$primaryalt &&
    css`
      color: ${props.theme.ACCENT_COLOR};
      background-color: transparent;
      border: 2px solid ${props.theme.ACCENT_COLOR};
      box-shadow: 0px 5px 10px ${props.theme.ACCENT_SHADOW_COLOR};
    `}
  ${(props) =>
    props.$successalt &&
    css`
      color: #2fa12d;
      background-color: transparent;
      border: 2px solid #2fa12d;
      box-shadow: 0px 5px 10px rgba(47, 161, 45, 0.1);
    `}
  ${(props) =>
    props.$dangeralt &&
    css`
      color: #e32319;
      background-color: transparent;
      border: 2px solid #e32319;
      box-shadow: 0px 5px 10px rgba(234, 84, 85, 0.1);
    `}
`

const ButtonWrapper = (props: ButtonProps) => {
  const theme = useSelector((state: useSelectorProps) => state.theme)
  return (
    <ThemeProvider theme={theme}>
      <Button
        {...props}
        $hidden={props.hidden}
        $primary={props.$primary}
        $secondary={props.$secondary}
        $success={props.$success}
        $danger={props.$danger}
        $primaryalt={props.primaryalt}
        $successalt={props.successalt}
        $dangeralt={props.dangeralt}
      />
    </ThemeProvider>
  )
}

export default ButtonWrapper
