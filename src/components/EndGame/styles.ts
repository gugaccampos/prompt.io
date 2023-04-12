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
  width: 40%;
  height: 60%;
  padding: 12px 32px;
  font-size: 2rem;

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
