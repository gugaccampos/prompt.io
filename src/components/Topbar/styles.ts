import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  margin: 0 auto;
  padding: 16px 0;

  & > svg {
    height: 16px !important;
  }
`

export const LogoContainer = styled.div`
  margin-left: 50px;
`

export const Text = styled.h1`
  font-weight: 500;
  font-size: 2rem;

  color: #ffffff;
  text-align: center;

  margin: 0 80px;
`

export const TutorialButton = styled.button`
  background-color: transparent;

  outline: none;
  border: ${({ theme }) => `3px solid ${theme.colors.grey}`};
  color: ${({ theme }) => theme.colors.grey};
  border-radius: 4px;

  padding: 0 10px;
  height: 40px;
  margin-right: 40px;

  cursor: pointer;

  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 600;

  &:hover {
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
`

export const NextButton = styled.button`
  height: 40px;
  padding: 0 10px;
  font-size: 1.5rem;
  border-radius: 4px;

  background-color: transparent;
  color: ${({ theme }) => theme.colors.grey};
  border: ${({ theme }) => `3px solid ${theme.colors.grey}`};

  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`

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

export const Close = styled.div`
  ${() => css`
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  `}
`

export const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #302c42;
  border-radius: 10px;
  width: 60%;
  height: 90%;
  padding: 24px 32px;
  font-size: 2rem;
`

export const TutorialText = styled.text``

export const TutorialExamples = styled.div``

export const TutorialExamplesText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
