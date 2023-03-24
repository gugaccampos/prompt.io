import { TriesContextProvider } from 'contexts/TriesContext'
import { Container } from 'styles/global'
import { Default } from '../view/index'

export default function Home() {
  return (
    <Container>
      <TriesContextProvider>
        <Default />
      </TriesContextProvider>
    </Container>
  )
}
