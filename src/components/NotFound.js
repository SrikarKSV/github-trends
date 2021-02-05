import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default class NotFound extends Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <div className={`not-found ${theme}`}>
            <h3>404 Error</h3>
            <p>Page not Found</p>
            <Link to='/'>Go back to home</Link>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
