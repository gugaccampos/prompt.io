import styled from 'styled-components'

export const Input = styled.input<{ color?: string; blur?: boolean }>`
  width: 32px;
  height: 48px;

  @media (max-width: 1500px) {
    width: 24px;
    height: 36px;
  }

  border: none;
  border-radius: 4px;

  margin: 2px;
  background: ${({ theme, color }) => color || theme.colors.bgLight};
  background: ${({ theme, color }) =>
    color === 'opacity' && theme.colors.black};

  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
  @media (max-width: 1500px) {
    font-size: 18px;
  }
  font-weight: 500;
  color: white;

  outline: none;

  &:focus {
    border-bottom: 3px solid white;
  }

  &:hover {
    cursor: pointer;
  }

  opacity: ${(props) => (props.blur || props.color === 'opacity' ? 0.4 : 1)};

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

export const InputDiv = styled.div`
  display: flex;
  align-items: center;

  &:focus {
    border-bottom: 3px solid white;
  }
`
