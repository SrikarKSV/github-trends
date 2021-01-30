import React, { Component } from 'react';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Results from './components/Results';
import './styles/main.scss';

export default class App extends Component {
  state = {
    selectedLanguage: 'Any',
    selectedDate: 'daily',
  };

  updateSelectedLanguage = (language) => {
    this.setState({
      selectedLanguage: language,
    });
  };

  updateSelectedDate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    return (
      <div className='container'>
        <Nav />
        <main>
          <Menu
            updateLanguage={this.updateSelectedLanguage}
            updateDate={this.updateSelectedDate}
          />
          <Results />
        </main>
      </div>
    );
  }
}
