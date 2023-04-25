import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 30%;

  margin: 10px auto;

  & > svg {
    height: 1px !important;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  width: 94px;
  height: fit-content;
  align-items: center;
`

export const Text = styled.h1`
  font-weight: 500;
  font-size: 2rem;

  color: #ffffff;
  text-align: center;

  width: 90%;
  margin: 0 auto;
`

export const ButtonContainer = styled.button`
  display: grid;
  place-items: center;

  background-color: transparent;

  outline: none;
  border: ${({ theme }) => `3px solid ${theme.colors.grey}`};
  color: ${({ theme }) => theme.colors.grey};
  border-radius: 4px;

  width: 4rem;
  height: 3.6rem;

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

  max-width: 810px;
  max-height: 800px;
  padding: 24px 32px;
  font-size: 2rem;
  @media (max-width: 600px) {
    width: 90%;
    padding: 12px 16px;
    font-size: 1rem;
  }
`

export const TutorialText = styled.text`
  @media (max-width: 600px) {
    font-size: 1.3rem;
    &:first-child {
      text-align: center;
    }
  }
`

export const TutorialExamples = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

export const TutorialExamplesText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`

export const ConfigModal = styled.div<ModalProps>`
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

export const ConfigClose = styled.div`
  color: white;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-self: flex-end;

  &:hover {
    opacity: 0.7;
  }
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    gap: 1rem;
    width: 40px;
  }
`

export const MobileButton = styled(Buttons)`
  @media (min-width: 601px) {
    display: none;
  }
`

export const BigDevicesButtons = styled(Buttons)`
  @media (max-width: 600px) {
    display: none;
  }
  @media (min-width: 601px) {
    margin-right: 30px;
  }
`

export const LogoAndTexts = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  /* display: flex;
  flex-direction: column;
  align-items: center; */
`

export const ConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #302c42;
  border-radius: 10px;
  width: 30%;
  gap: 1.6rem;
  min-width: 450px;
  max-width: 600px;
  max-height: 450px;
  padding: 1.2rem 3.2rem;
  font-size: 2rem;
  @media (max-width: 600px) {
    width: 80%;
    min-width: 80%;
  }
`
export const ConfigDaltonico = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 2rem;
    cursor: pointer;
  }
`

export const ConfigText = styled.text``

export const Devs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    display: inline;
    color: white;
    width: fit-content;
    color: ${(props) => props.theme.colors.secondary};
  }
`

export const Termo = styled.div`
  a {
    color: ${(props) => props.theme.colors.secondary};
  }
`

export const LogoSvg = styled.svg`
  height: 25px;
`
