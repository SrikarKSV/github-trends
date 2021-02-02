import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <div className='bg-dark'>
        <div className='container'>
          <Nav />
          <main>
            <Home />
          </main>
        </div>
      </div>
    );
  }
}
