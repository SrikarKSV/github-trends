import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <header>
        <div className='header-left'>
          <h1>
            <a href='/'>GitHub Trends</a>
          </h1>
          <nav>
            <ul>
              <li>
                <a href='/user-search'>User Search</a>
              </li>
              <li>
                <a href='/battle'>Battle</a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button className='theme-switch'>
            <FontAwesomeIcon size='2x' icon={faMoon} />
          </button>
        </div>
      </header>
    );
  }
}
