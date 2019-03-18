import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'typeface-roboto'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Roboto;
    font-size: 1em;
    margin: 0px;
    width: 100%;
    height: 100%;
  }
  `

export default class Root extends Component {
  render() {
    return (
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
    );
  }
}

