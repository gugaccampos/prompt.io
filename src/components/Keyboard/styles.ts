import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  margin-top: 24px;
  @media (max-width: 2000px) {
    margin-top: 12px;
  }

  & > div {
    display: flex;
    justify-content: center;
  }
`
