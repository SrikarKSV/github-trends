import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  state = {
    content: this.props.text,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: 'Loading',
  };

  componentDidMount() {
    const { text } = this.props;
    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }));
    }, 200);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <h4>{this.state.content}</h4>;
  }
}
