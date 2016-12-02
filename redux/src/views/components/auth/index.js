import React from 'react'
import { Modal, Button } from 'antd';
import { EmailSignUpForm, EmailSignInForm } from "redux-auth/material-ui-theme";

const Auth = ({ show, close }) => {
  return (
    <Modal
      wrapClassName="vertical-center-modal"
      visible={ show }
      footer={
        <div style={{ textAlign: 'center' }}>
          you're one step closer to tweeting an emoji
        </div>
      }
      onCancel={ close }
    >
      {
        (show === 'registration') ?
          <EmailSignUpForm />
        : <EmailSignInForm />
      }
    </Modal>
  );
};

export default Auth
