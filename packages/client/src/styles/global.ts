import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${colors.grey};
    color: ${colors.black};
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  input {
    border: none;
    height: 50px;
    border-radius: 4px;
    padding: 5px 10px;
    margin: 15px 0;
  }

  button {
    height: 50px;
    cursor: pointer;
    border: none;
    display: block;
    background-color: ${colors.purple};
    color: ${colors.white};
    padding: 5px 15px;
    border-radius: 4px;
    width: 100%;
  }
`;
