import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='bg-dark'>
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
      </Router>
    );
  }
}
