import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './App.global.css';
import 'fontsource-roboto';
import Router from './Router';
import theme from './styles/theme';
import TodoDataProvider from './contexts/TodoDataProvider';

export default function App() {
  console.log('hey');
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <TodoDataProvider>
          <Router />
        </TodoDataProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
