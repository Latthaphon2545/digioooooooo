import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

const Section = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
`

const Title = styled.div`
  ${(props) => `display: ${props.children ? 'block' : 'none'};`}
  padding: 15px 30px;
  color: #92a3b9;
  background-color: #fafbfd;
  border-bottom: 1px solid #f4f6f9;
`

const Content = styled.div`
  padding: 20px 30px 30px 30px;
`

const SectionWrapper = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Section>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Section>
  )
}

export default SectionWrapper
