import React from 'react'
import Header from './Header'
import Content from './Content';

import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import theme from './theme'

function Container() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header/>
      <Content/>
    </ThemeProvider>
  )
}

export default Container