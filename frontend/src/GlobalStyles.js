// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Roboto&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #f9f9f9; /* Light background for contrast */
    font-family: 'Roboto', sans-serif;
    color: #303030; /* Darker text for better readability */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    color: #bf9000; /* Old Gold for headings */
  }

  /* Thin lines and borders */
  hr, .thin-border {
    border: 0;
    border-top: 1px solid #CCCCCC;
  }

  /* Remove default link styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Consistent button styles */
  button {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
  }

  /* Table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    color: #bf9000;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export default GlobalStyles;
