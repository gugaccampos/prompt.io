import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  margin-top: 12px;

  & > div {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 600px) {
    width: 92%;

    div:first-child {
      width: 110%;
      margin-left: -5%;
    }

    div:last-child {
      width: 110%;
      margin-left: -5%;
    }

    position: fixed;
    background-color: ${(props) => props.theme.colors.bg};
    bottom: 0;
    padding: 1rem;
  }
`
