import styled from 'styled-components'

export const ContainerInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const Input = styled.input<{ color?: string; blur?: boolean }>`
  width: 1.5em;
  height: 2em;

  border: none;
  border-radius: 4px;

  margin: 2px;
  background: ${({ theme, color }) => color || theme.colors.bgLight};
  background: ${({ theme, color }) =>
    color === 'opacity' && theme.colors.black};

  text-transform: uppercase;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: white;

  outline: none;

  &:focus {
    border-bottom: 3px solid white;
  }

  &:hover {
    cursor: pointer;
  }
  caret-color: transparent;
  opacity: ${(props) => (props.blur || props.color === 'opacity' ? 0.4 : 1)};

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
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
