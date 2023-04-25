import styled, { css } from 'styled-components'

type ModalProps = {
  isOpen: boolean
}

const modalModifiers = {
  open: () => css`
    opacity: 1;
  `,

  close: () => css`
    opacity: 0;
    pointer-events: none;
  `
}

export const Modal = styled.div<ModalProps>`
  ${({ isOpen }) => css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: opacity 0.3s ease;

    ${isOpen && modalModifiers.open()}
    ${!isOpen && modalModifiers.close()}
  `}
`

export const Close = styled.div`
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: right;
`

export const EndGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #302c42;
  border-radius: 10px;
  width: 50%;
  height: 80%;
  @media (max-width: 600px) {
    width: 80%;
    height: 90%;
  }
  max-width: 550px;
  max-height: 400px;
  padding: 12px 32px;
  font-size: 2rem;
  text-align: center;

  > h3 {
    width: 50%;
    text-align: center;
    font-size: 2rem;

    @media (max-width: 800px) {
      width: 80%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3:last-child {
      font-weight: bold;
      font-size: 3rem;
      color: ${(props) => props.theme.colors.green};
    }
  }
`

export const EndGameContent = styled.div`
  flex: 1;
  background-color: '#000';
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme.colors.blue};
  color: #fff;
  gap: 0.2rem;
  z-index: 1;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
