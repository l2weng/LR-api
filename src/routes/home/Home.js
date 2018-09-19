import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  // static propTypes = {
  //   news: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       title: PropTypes.string.isRequired,
  //       link: PropTypes.string.isRequired,
  //       content: PropTypes.string,
  //     }),
  //   ).isRequired,
  // };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>I'm API server</h2>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
