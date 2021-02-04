import React, { Component } from 'react';
import PropTypes from 'prop-types';
import languages from '../data/githubLanguages';
import tagBeep from '../assets/hoverBeep.mp3';

export default class Menu extends Component {
  state = {
    selectTaglanguage: '',
  };

  static propTypes = {
    updateLanguage: PropTypes.func.isRequired,
    updateDate: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    selectedDate: PropTypes.string.isRequired,
    loadingData: PropTypes.bool.isRequired,
  };
  tagAudio = React.createRef();

  playTagBeep = () => {
    this.tagAudio.current.volume = 0.5;
    this.tagAudio.current.play();
  };

  render() {
    const {
      updateLanguage,
      updateDate,
      updateMode,
      mode,
      selectedLanguage,
      selectedDate,
      loadingData,
    } = this.props;
    const popularLanguages = ['Any', 'Python', 'JavaScript', 'Go', 'Css'];
    const trendingModes = ['Repos', 'Devs'];
    const dateRange = {
      Today: 'daily',
      'This week': 'weekly',
      'This month': 'monthly',
    };

    return (
      <section className='menu-container'>
        <h4>Find the trending repositories or developers on GitHub!</h4>
        <div className='trend-select'>
          {trendingModes.map((trendingMode) => (
            <button
              key={trendingMode}
              style={
                mode === trendingMode.toLowerCase()
                  ? { background: '#55ABD6' }
                  : null
              }
              onClick={() => updateMode(trendingMode.toLowerCase())}
              disabled={loadingData ? true : false}
            >
              {trendingMode}
            </button>
          ))}
        </div>
        <div className='menu-options'>
          <div className='menu-options__languages'>
            <p>Languages :</p>
            <ul>
              {popularLanguages.map((lang) => (
                <li key={lang}>
                  <button
                    style={
                      selectedLanguage === lang
                        ? { background: '#55c57a' }
                        : null
                    }
                    onClick={() => updateLanguage(lang)}
                    onMouseEnter={this.playTagBeep}
                  >
                    {lang}
                  </button>
                </li>
              ))}
              <li>
                <select
                  name='other-languages'
                  onChange={(e) => {
                    updateLanguage(e.target.value);
                    this.setState({
                      selectTaglanguage: e.target.value,
                    });
                  }}
                  style={
                    this.state.selectTaglanguage === selectedLanguage
                      ? { background: '#55c57a' }
                      : { background: '#e60067' }
                  }
                  onMouseEnter={this.playTagBeep}
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
                    style={
                      selectedDate === dateRange[date]
                        ? { background: '#55c57a' }
                        : null
                    }
                    value={dateRange[date]}
                    onClick={(e) => updateDate(e.target.value)}
                    onMouseEnter={this.playTagBeep}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <audio ref={this.tagAudio} src={tagBeep}></audio>
      </section>
    );
  }
}
