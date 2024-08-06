import styled, { css } from 'styled-components'

interface BankProps {
  bank: string
}

const Bank = styled.img<BankProps>`
  ${(props) =>
    props.bank &&
    css`
      content: url('/icons/banks/${props.bank.toLowerCase()}.png');
    `}
  margin-right: 10px;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  border-radius: 25px;
`

export default Bank
