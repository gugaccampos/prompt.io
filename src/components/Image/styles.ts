import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;

  width: 100%;
  max-width: 256px;
  @media (max-width: 1500px) {
    max-width: 180px;
  }
`

export const Image = styled.div<{ src: string }>`
  background-size: cover;
  height: 256px;
  @media (max-width: 1500px) {
    height: 180px;
  }
  border-radius: 8px;
  min-width: 100%;

  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`

export const Span = styled.span`
  width: 256px;
  height: 256px;

  border-radius: 8px;
`
