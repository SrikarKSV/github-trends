import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoCards from './RepoCards';

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
      <section>
        <h4>Results</h4>

        {mode === 'repos' ? (
          repoData?.[selectedDate]?.[selectedLanguage] ? (
            <RepoCards repos={repoData[selectedDate][selectedLanguage]} />
          ) : (
            'Loading'
          )
        ) : devData?.[selectedDate]?.[selectedLanguage] ? (
          JSON.stringify(devData[selectedDate][selectedLanguage])
        ) : (
          'Loading'
        )}
      </section>
    );
  }
}
