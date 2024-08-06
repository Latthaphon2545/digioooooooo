import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

const SubSection = styled.div``

const Title = styled.div`
  ${(props) => `display: ${props.children ? 'inline-block' : 'none'};`}
  margin-bottom: 10px;
  padding: 0px 10px;
  line-height: 1.5;
  color: #92a3b9;
  border-left: 5px solid #e2e9f2;
`

const Content = styled.div``

type SubSectionWrapperProps = {
  title: String
  style?: Object
  children?: React.ReactNode
}

const SubSectionWrapper = ({
  title,
  style,
  children
}: SubSectionWrapperProps) => {
  return (
    <SubSection style={style}>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </SubSection>
  )
}

export default SubSectionWrapper
