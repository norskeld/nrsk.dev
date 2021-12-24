import Container from './container'
import Wrapper from './wrapper'
import Footer from './footer'
import Nav from './nav'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  )
}
