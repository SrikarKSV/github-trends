import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoCardGrid from './RepoCardGrid';
import UserCardGrid from './UserCardGrid';

export default class Results extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    repoData: PropTypes.object.isRequired,
    devData: PropTypes.object.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    selectedDate: PropTypes.string.isRequired,
  };

  render() {
    const {
      mode,
      repoData,
      devData,
      selectedLanguage,
      selectedDate,
    } = this.props;

    return (
      <section className='results-container'>
        <h4 className='results-container__header'>Results</h4>

        {mode === 'repos' ? (
          repoData?.[selectedDate]?.[selectedLanguage] ? (
            <RepoCardGrid repos={repoData[selectedDate][selectedLanguage]} />
          ) : (
            'Loading'
          )
        ) : devData?.[selectedDate]?.[selectedLanguage] ? (
          <UserCardGrid devs={devData[selectedDate][selectedLanguage]} />
        ) : (
          'Loading'
        )}
      </section>
    );
  }
}
