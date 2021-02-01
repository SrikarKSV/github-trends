import axios from 'axios';
import React, { Component } from 'react';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Results from './components/Results';
import './styles/main.scss';

export default class App extends Component {
  state = {
    mode: 'repos',
    selectedLanguage: 'Any',
    selectedDate: 'daily',
    repoData: {},
    devData: {},
  };

  updateSelectedLanguage = (language) => {
    // * setState can take a callback
    // * which will be executed when state is updaed
    this.setState(
      {
        selectedLanguage: language,
      },
      () => this.fetchData()
    );
  };

  updateSelectedDate = (date) => {
    this.setState(
      {
        selectedDate: date,
      },
      () => this.fetchData()
    );
  };

  updateMode = (mode) => {
    this.setState(
      {
        mode,
      },
      () => this.fetchData()
    );
  };

  setRepoLanguageState = (data) => {
    this.setState(({ repoData, selectedDate, selectedLanguage }) => ({
      repoData: {
        ...repoData,
        [selectedDate]: {
          ...repoData[selectedDate],
          [selectedLanguage]: data,
        },
      },
    }));
  };

  setDevLanguageState = (data) => {
    this.setState(({ devData, selectedDate, selectedLanguage }) => ({
      devData: {
        ...devData,
        [selectedDate]: {
          ...devData[selectedDate],
          [selectedLanguage]: data,
        },
      },
    }));
  };

  setLanguageState = (data) => {
    this.state.mode === 'repos'
      ? this.setRepoLanguageState(data)
      : this.setDevLanguageState(data);
  };

  fetchModeData = async (func, url) => {
    try {
      const res = await axios.post(`/api/${func}`, {
        url,
      });
      const data = await res.data;
      this.setLanguageState(data);
    } catch (err) {
      if (err.response.status === 404) {
        this.setLanguageState('No trending repo/user found');
      } else {
        this.setLanguageState('Error: Try again later');
      }
    }
  };

  fetchData = () => {
    let url = `https://github.com/trending${
      this.state.selectedLanguage === 'Any'
        ? ''
        : `/${this.state.selectedLanguage}`
    }?since=${this.state.selectedDate}`;

    if (this.state.mode === 'repos') {
      this.fetchModeData('getTrendingRepo', url);
    } else {
      // Updating link for trending devs
      url = url.replace(/\.com\/trending/, '.com/trending/developers');
      this.fetchModeData('getTrendingDev', url);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className='bg-dark'>
        <div className='container'>
          <Nav />
          <main>
            <Menu
              mode={this.state.mode}
              updateMode={this.updateMode}
              updateLanguage={this.updateSelectedLanguage}
              updateDate={this.updateSelectedDate}
            />
            <Results
              mode={this.state.mode}
              repoData={this.state.repoData}
              devData={this.state.devData}
              selectedLanguage={this.state.selectedLanguage}
              selectedDate={this.state.selectedDate}
            />
          </main>
        </div>
      </div>
    );
  }
}
