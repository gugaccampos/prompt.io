import styled, { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-300.woff2') format('woff2');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v15-latin-600.woff2') format('woff2');
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  html, body, #__next {
    height: 100%;
  }

  .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  
  .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: grey;
    border-radius: 100px;
    position: relative;
    transition: background-color .2s;
  }
  
  .react-switch-label .react-switch-button {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 25px;
    height: 25px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }
  
  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
  
  .react-switch-label:active .react-switch-button {
    width: 60px;
  }

  .skeleton-box {
    display: inline-block;
    height: 1em;
    position: relative;
    overflow: hidden;
    background-color: #DDDBDD;
  
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: shimmer 2s infinite;
      content: '';
    }
  
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }  

  ${({ theme }) => css`
    html,
    body,
    #__next {
      height: 100%;
    }
    body {
      font-family: ${theme.fonts.family};
      font-size: ${theme.fonts.sizes.medium};
      color: ${theme.colors.white};

      background: ${theme.colors.bg};
    }
  `}
`

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    width: 100%;
    max-width: ${theme.grid.container};

    margin-left: auto;
    margin-right: auto;

    padding-left: calc(${theme.grid.gutter} / 2);
    padding-right: calc(${theme.grid.gutter} / 2);
  `}
`

export default GlobalStyles
