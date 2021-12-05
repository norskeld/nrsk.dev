import React from 'react'

import Container from './container'
import Wrapper from './wrapper'
import Nav from './nav'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Wrapper>
      <Nav />
      <Container>{children}</Container>
    </Wrapper>
  )
}
