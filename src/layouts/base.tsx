import Container from '@/components/shared/container'
import Wrapper from '@/components/shared/wrapper'
import Footer from '@/components/shared/footer'
import Nav from '@/components/shared/nav'

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
