import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <header>
        <div className='header-left'>
          <h1>
            <Link to='/'>GitHub Trends</Link>
          </h1>
          <nav>
            <ul>
              <li>
                <NavLink activeClassName='active-nav' to='/user-search'>
                  User Search
                </NavLink>
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
