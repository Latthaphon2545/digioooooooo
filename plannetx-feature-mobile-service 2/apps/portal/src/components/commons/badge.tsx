import styled from 'styled-components'

interface BadgeProps {
  width?: string
  color: string
  backgroundcolor: string
}

const Badge = styled.div<BadgeProps>`
  padding: 0px 10px;
  line-height: 2em;
  font-size: 0.875em;
  text-align: center;
  border-radius: 20px;
  ${(props) => `
      width: ${props.width || 'auto'};
      color: ${props.color};
      background-color: ${props.backgroundcolor};
    `}
`

export default Badge
