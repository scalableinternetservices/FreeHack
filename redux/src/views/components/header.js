import React, { PropTypes } from 'react';
import { Link } from 'redux-little-router'

import { Menu, Dropdown, Icon, Button } from 'antd';

import '../styles/header.css';

const publicMenu = (initiateAuth) => (
  <Menu onClick={
        ({ key }) => {
          switch (key) {
            case "signIn":
              initiateAuth('login')
              break
            case "signUp":
              initiateAuth('registration')
              break
            default:
          }
        }
      }
  >
    <Menu.Item key="signIn">
      Sign In
    </Menu.Item>
    <Menu.Item key="signUp">
      Sign Up
    </Menu.Item>
  </Menu>
);

const authMenu = (create) => (
  <Menu
    onClick={
      ({ key }) => {
        switch (key) {
          case "create":
            create()
            break
          case "signOut":
            break
          default:
        }
      }
    }>
    <Menu.Item key="create">
      Tweet Now
    </Menu.Item>
    <Menu.Item key="signOut">
      Sign Out
    </Menu.Item>
  </Menu>
);

const Header = ({ auth, initiateAuth, draft }) => {
  let authenticated = auth.getIn(["isSignedIn"])
  let menu = authenticated ? authMenu(draft) : publicMenu(initiateAuth)
  let menuText = authenticated ? "Hi, " + auth.getIn(["attributes", "name"])
  : "Get Tweeting"

  return (
    <header className="header">
      <ul>
        <li>
          <Link className="home-link" href='/home'>
            {
              authenticated ?
                <Button className="logo" type="primary" shape="circle" icon="dingding" />
              : <Button className="logo" type="primary" icon="dingding">
                  tweetmoji
                </Button>
            }
          </Link>
        </li>
        <li>
          <Dropdown overlay={ menu }>
            <a className="ant-dropdown-link">
              { menuText } <Icon type="down" />
            </a>
          </Dropdown>
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  // signOut: PropTypes.func.isRequired
};

export default Header;
