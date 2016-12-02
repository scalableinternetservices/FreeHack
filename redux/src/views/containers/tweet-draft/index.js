import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { tweetActions } from '../../../core/entities/tweets';
import ActiveTweet from '../../components/active-tweet'

const mapStateToProps = (state, ownProps) => {
  return {
    show: state.ui.activeDraft
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    attemptTweet: (content) => {
      dispatch(tweetActions.createTweet(content))
    },
    close: () => dispatch({ type: 'CANCEL_CREATE_TWEET' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTweet);
