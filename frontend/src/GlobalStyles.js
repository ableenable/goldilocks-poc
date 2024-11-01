import { createGlobalStyle } from 'styled-components';

import PlayfairDisplay from './assets/fonts/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf';
import Roboto from './assets/fonts/Roboto/Roboto-Regular.ttf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Playfair Display';
    src: local('Playfair Display'), url(${PlayfairDisplay}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    src: local('Roboto'), url(${Roboto}) format('truetype');
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    color: #000000;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }

  /* Thin lines and borders */
  hr, .thin-border {
    border: 0;
    border-top: 1px solid #CCCCCC;
  }
`;

export default GlobalStyles;
