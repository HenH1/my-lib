import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Users from './Pages/UsersPage';
import Books from './Pages/BooksPage';
import Authors from './Pages/AuthorsPage';
import './App.css';
import { AppBar, ThemeProvider, Toolbar } from '@mui/material';
import { theme } from './theme';
import MenuAppBar from './Components/MenuAppBar';
import MiniDrawer from './Components/SideDrawer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Router>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/users' component={MiniDrawer}></Route>
          <Route exact path='/books' component={MiniDrawer}></Route>
          <Route exact path='/authors' component={MiniDrawer}></Route>

          {/* <MiniDrawer />
          <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/users">users</Link>
              </li>
              <li>
                <Link to="/books">books</Link>
              </li>
              <li>
                <Link to="/authors">authors</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path='/' component={Login}></Route>
              <Route exact path='/books' component={Books}></Route>
              <Route exact path='/users' component={Users}></Route>
              <Route exact path='/authors' component={Authors}></Route>
            </Switch>
          </div> */}
        </Router>
      </React.Fragment>
    </ThemeProvider>
    //   <ThemeProvider theme={themeOptions}>
    //     <Router>
    //     <MenuAppBar/>

    //       <div className="App">
    //         <ul className="App-header">
    //           <li>
    //             <Link to="/">Login</Link>
    //           </li>
    //           <li>
    //             <Link to="/users">users</Link>
    //           </li>
    //           <li>
    //             <Link to="/books">books</Link>
    //           </li>
    //           <li>
    //             <Link to="/authors">authors</Link>
    //           </li>
    //         </ul>
    //         <Switch>
    //           <Route exact path='/' component={Login}></Route>
    //           <Route exact path='/books' component={Books}></Route>
    //           <Route exact path='/users' component={Users}></Route>
    //           <Route exact path='/authors' component={Authors}></Route>
    //         </Switch>
    //       </div>
    //     </Router>
    //   </ThemeProvider>
  );
}

export default App;
