import React, { PropTypes } from 'react';
import { Provider } from 'react-redux'
import {
  RouterProvider,
  RelativeFragment,
  AbsoluteFragment
} from 'redux-little-router';
import { LocaleProvider, Row, Col } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import App from './app'
import SearchBarContainer from './containers/search-bar-container'
import DynamicProfile from './containers/dynamic-profile'
import SearchResultContainer from './containers/search-result-container'
import TweetFeedContainer from './containers/tweet-feed-container'
import Profile from './components/profile'
import TweetDraft from './containers/tweet-draft'

function Root({store}) {
  return (
    <Provider store={store}>
      <RouterProvider store={store}>
        <LocaleProvider locale={enUS}>
          <App>
            <RelativeFragment forRoute='/'>
              <TweetDraft />
              <SearchBarContainer />
              <Row gutter={16}>
                <Col xs={{ span: 5, offset: 1 }}>
                  <DynamicProfile />
                </Col>
                <Col xs={12}>
                  <RelativeFragment forRoute='/home'>
                    <RelativeFragment forRoute='/search'>
                      <SearchResultContainer />
                    </RelativeFragment>
                    <TweetFeedContainer />
                  </RelativeFragment>
                  <RelativeFragment forRoute='/users'>
                    <RelativeFragment forRoute='/:userid'>
                      <Profile />
                    </RelativeFragment>
                  </RelativeFragment>
                </Col>
              </Row>
            </RelativeFragment>
          </App>
        </LocaleProvider>
      </RouterProvider>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
