import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import AppPage from './pages/AppPage';

const App = () => {
  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={AppPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
