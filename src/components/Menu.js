import React, { Component } from 'react';
import languages from '../data/githubLanguages';

export default class Menu extends Component {
  render() {
    return (
      <section className='menu-container'>
        <h4>Find the trending repositories or developers on GitHub!</h4>
        <div className='trend-select'>
          <button>Repos</button>
          <button>Users</button>
        </div>
        <div className='menu-options'>
          <div className='menu-options__languages'>
            <p>Languages :</p>
            <ul>
              <li>
                <button>All</button>
              </li>
              <li>
                <button>Python</button>
              </li>
              <li>
                <button>JavaScript</button>
              </li>
              <li>
                <button>Go</button>
              </li>
              <li>
                <button>Css</button>
              </li>
              <li>
                <select name='other-languages'>
                  {Object.keys(languages).map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
          <div className='menu-options__date-range'>
            <p>Data range :</p>
            <ul>
              <li>
                <button>Daily</button>
              </li>
              <li>
                <button>This week</button>
              </li>
              <li>
                <button>This month</button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
