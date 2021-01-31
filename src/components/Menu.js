import React, { Component } from 'react';
import PropTypes from 'prop-types';
import languages from '../data/githubLanguages';

export default class Menu extends Component {
  static propTypes = {
    updateLanguage: PropTypes.func.isRequired,
    updateDate: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
  };

  render() {
    const { updateLanguage, updateDate, updateMode } = this.props;
    const popularLanguages = ['Any', 'Python', 'JavaScript', 'Go', 'Css'];
    const dateRange = {
      Today: 'daily',
      'This week': 'weekly',
      'This month': 'monthly',
    };

    return (
      <section className='menu-container'>
        <h4>Find the trending repositories or developers on GitHub!</h4>
        <div className='trend-select'>
          <button onClick={() => updateMode('repos')}>Repos</button>
          <button onClick={() => updateMode('devs')}>Devs</button>
        </div>
        <div className='menu-options'>
          <div className='menu-options__languages'>
            <p>Languages :</p>
            <ul>
              {popularLanguages.map((lang) => (
                <li key={lang}>
                  <button onClick={() => updateLanguage(lang)}>{lang}</button>
                </li>
              ))}
              <li>
                <select
                  name='other-languages'
                  onChange={(e) => updateLanguage(e.target.value)}
                >
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
              {Object.keys(dateRange).map((date) => (
                <li key={date}>
                  <button
                    value={dateRange[date]}
                    onClick={(e) => updateDate(e.target.value)}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
