import axios from 'axios';
import React, { Component } from 'react';
import Menu from './TrendMenu';
import Results from './TrendResults';

export default class Home extends Component {
  state = {
    mode: 'repos',
    selectedLanguage: 'Any',
    selectedDate: 'daily',
    repoData: {},
    devData: {},
    loadingData: false,
  };
  signal = axios.CancelToken.source();

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

  setRepoLanguageState = (data, selectedDate, selectedLanguage) => {
    this.setState(({ repoData }) => ({
      repoData: {
        ...repoData,
        [selectedDate]: {
          ...repoData[selectedDate],
          [selectedLanguage]: data,
        },
      },
    }));
  };

  setDevLanguageState = (data, selectedDate, selectedLanguage) => {
    this.setState(({ devData }) => ({
      devData: {
        ...devData,
        [selectedDate]: {
          ...devData[selectedDate],
          [selectedLanguage]: data,
        },
      },
    }));
  };

  setLoadingDataState = (bool) => {
    this.setState({
      loadingData: bool,
    });
  };

  setLanguageState = (data, selectedDate, selectedLanguage) => {
    this.state.mode === 'repos'
      ? this.setRepoLanguageState(data, selectedDate, selectedLanguage)
      : this.setDevLanguageState(data, selectedDate, selectedLanguage);
    this.setLoadingDataState(false);
  };

  fetchModeData = async (func, url, selectedDate, selectedLanguage) => {
    try {
      const res = await axios.post(
        `/.netlify/functions/${func}`,
        {
          url,
        },
        {
          cancelToken: this.signal.token,
        }
      );
      const data = await res.data;
      this.setLanguageState(data, selectedDate, selectedLanguage);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message);
      } else if (err.response.status === 404) {
        this.setLanguageState('No trending repo/user found');
      } else {
        this.setLanguageState('Error: Try again later');
      }
    }
  };

  fetchData = () => {
    const mode = this.state.mode;

    let url = `https://github.com/trending${
      this.state.selectedLanguage === 'Any'
        ? ''
        : `/${this.state.selectedLanguage}`
    }?since=${this.state.selectedDate}`;
    // SelectedDate and SelectedLanguage is saved
    // If the user switches languages the data will be stored in appropriate langauge
    const selectedDate = this.state.selectedDate;
    const selectedLanguage = this.state.selectedLanguage;

    // Checking if the requested resource is already present or not
    if (
      mode === 'repos' &&
      !this.state.repoData?.[this.state.selectedDate]?.[
        this.state.selectedLanguage
      ]
    ) {
      this.setLoadingDataState(true);
      this.fetchModeData(
        'getTrendingRepo',
        url,
        selectedDate,
        selectedLanguage
      );
    } else if (
      mode === 'devs' &&
      !this.state.devData?.[this.state.selectedDate]?.[
        this.state.selectedLanguage
      ]
    ) {
      this.setLoadingDataState(true);
      // Updating link for trending devs
      url = url.replace(/\.com\/trending/, '.com/trending/developers');
      this.fetchModeData('getTrendingDev', url, selectedDate, selectedLanguage);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  render() {
    return (
      <>
        <Menu
          mode={this.state.mode}
          updateMode={this.updateMode}
          updateLanguage={this.updateSelectedLanguage}
          updateDate={this.updateSelectedDate}
          selectedLanguage={this.state.selectedLanguage}
          selectedDate={this.state.selectedDate}
          loadingData={this.state.loadingData}
        />
        <Results
          mode={this.state.mode}
          repoData={this.state.repoData}
          devData={this.state.devData}
          selectedLanguage={this.state.selectedLanguage}
          selectedDate={this.state.selectedDate}
        />
      </>
    );
  }
}
