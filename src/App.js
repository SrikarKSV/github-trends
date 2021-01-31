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
    this.setState({
      selectedLanguage: language,
    });
    this.fetchData();
  };

  updateSelectedDate = (date) => {
    this.setState({
      selectedDate: date,
    });
    this.fetchData();
  };

  updateMode = (mode) => {
    this.setState({
      mode,
    });
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

  fetchRepoData = async () => {
    try {
      const URL = `https://github.com/trending${
        this.state.selectedLanguage === 'Any'
          ? ''
          : `/${this.state.selectedLanguage}`
      }?since=${this.state.selectedDate}`;

      const res = await axios.post('/api/getTrendingRepo', {
        url: URL,
      });
      const data = await res.data;

      this.setRepoLanguageState(data);
    } catch (err) {
      if (err.response.status) {
        this.setRepoLanguageState('No trending repo/user found');
      } else {
        this.setRepoLanguageState('Error: Try again later');
      }
    }
  };

  fetchData = () => {
    if (this.state.mode === 'repos') {
      this.fetchRepoData();
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className='container'>
        <Nav />
        <main>
          <Menu
            updateMode={this.updateMode}
            updateLanguage={this.updateSelectedLanguage}
            updateDate={this.updateSelectedDate}
          />
          <Results />
        </main>
      </div>
    );
  }
}
