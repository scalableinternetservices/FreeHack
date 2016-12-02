import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AuthGlobals } from "redux-auth/material-ui-theme";
import { authActions } from '../../core/auth';
import '../styles/app.css';
import Auth from '../components/auth'
import Header from '../components/header';
import { tweetSuccessNotification } from '../components/notifications'

function App({ alertsToShow, alertFired, auth, showAuthModal, initiateAuth, closeAuthModal, newTweet, children }) {

  if (alertsToShow > 0) {
    tweetSuccessNotification()
    alertFired()
  }

  return (
    <div>
      <Header
        auth = { auth }
        initiateAuth = { initiateAuth }
        draft = { newTweet }
      />
      <AuthGlobals />
      <main className="app-content">
        <Auth show={ showAuthModal } close={ closeAuthModal } />
        { children }
      </main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.getIn(["user"]),
    showAuthModal: state.ui.showAuth,
    alertsToShow: state.ui.tweetPostSuccess
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initiateAuth: (type) => {
      dispatch(authActions.bootAuth(type))
    },
    closeAuthModal: () => {
      dispatch(authActions.closeAuth())
    },
    newTweet: () => {
      dispatch({ type: 'CREATE_TWEET_DRAFT' })
    },
    alertFired: () => {
      dispatch({ type: 'POST_TWEET_SUCCESS_ALERT_FIRED' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
