import styled from 'styled-components'

export const Button = styled.button<{ special?: boolean; color?: string }>`
  margin: 4px 2px;
  background-color: ${({ theme }) => theme.colors.black};
  background-color: ${(props) => props.color !== 'opacity' && props.color};

  outline: none;
  border: none;
  border-radius: 4px;

  @media (min-width: 601px) {
    width: ${({ special }) => (special ? '56px' : '32px')};
    height: 40px;
  }

  @media (max-width: 600px) {
    flex: 1;
    padding: 1em ${({ special }) => (special ? '0.4em' : '0')};
  }

  opacity: ${(props) => (props.color === 'opacity' ? 0.4 : 1)};

  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
`
