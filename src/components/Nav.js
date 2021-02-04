import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';
import switchAudio from '../assets/switch.mp3';

export default class Nav extends Component {
  audioRef = React.createRef();

  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <header>
            <div className='header-left'>
              <h1>
                <Link to='/'>GitHub Trends</Link>
              </h1>
              <nav>
                <ul>
                  <li>
                    <NavLink
                      activeClassName='active-nav'
                      className={`${theme}`}
                      to='/user-search'
                    >
                      User Search
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <button
                onClick={() => {
                  this.audioRef.current.play();
                  toggleTheme();
                }}
                className={`theme-switch ${theme}`}
              >
                {theme === 'dark' ? (
                  <FontAwesomeIcon size='2x' icon={faMoon} />
                ) : (
                  <FontAwesomeIcon size='2x' icon={faSun} />
                )}
              </button>
            </div>
            <audio preload='' ref={this.audioRef} src={switchAudio}></audio>
          </header>
        )}
      </ThemeConsumer>
    );
  }
}
