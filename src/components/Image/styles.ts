import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;

  width: 100%;
  max-width: 256px;
`

export const Image = styled.div<{ src: string }>`
  background-size: cover;
  height: 256px;
  border-radius: 8px;
  min-width: 100%;

  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`
