import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <header>
        <div className='header-left'>
          <h1>GitHub Trends</h1>
          <nav>
            <ul>
              <li>User Search</li>
              <li>Battle</li>
            </ul>
          </nav>
        </div>
        <div className='header-right'>
          <button>
            <FontAwesomeIcon size='2x' icon={faMoon} />
          </button>
        </div>
      </header>
    );
  }
}
