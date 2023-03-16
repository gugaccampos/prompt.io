import styled from 'styled-components'

export const Input = styled.input<{ color?: string; blur?: boolean }>`
  width: 32px;
  height: 48px;

  border: none;
  border-radius: 4px;

  margin: 2px;
  background: ${({ theme, color }) => color || theme.colors.bgLight};

  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: white;

  outline: none;

  opacity: ${(props) => (props.blur ? 0.4 : 1)};

  @media (max-width: 600px) {
    width: 24px;
    height: 32px;
  }
`

export const ContainerInputs = styled.div`
  display: flex;
  align-items: center;
`

export const Space = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 8px;
`
