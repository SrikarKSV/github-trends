import React, { Component } from 'react';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Results from './components/Results';
import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />
        <main>
          <Menu />
          <Results />
        </main>
      </div>
    );
  }
}
