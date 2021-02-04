import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';

export default class App extends Component {
  state = {
    theme: 'dark',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'dark' ? 'light' : 'dark',
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={`bg-${this.state.theme}`}>
            <div className='container'>
              <Nav />
              <main>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/user-search' component={UserSearch} />
                </Switch>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}
