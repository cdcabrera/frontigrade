import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';

const AccountView = ({ primaryClick }) => {
  const handleClick = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'success',
      message: <span>Success dolor sit amet.</span>
    });
  };

  return (
    <Grid fluid>
      <Row>
        <EmptyState className="full-page-blank-slate">
          <EmptyState.Icon />
          <EmptyState.Title>Welcome to Cloud Meter</EmptyState.Title>
          <EmptyState.Info>Add an AWS account to monitor usage.</EmptyState.Info>
          <EmptyState.Action>
            <Button bsStyle="primary" bsSize="large" onClick={primaryClick || handleClick}>
              Add Account
            </Button>
          </EmptyState.Action>
        </EmptyState>
      </Row>
    </Grid>
  );
};

AccountView.propTypes = {
  primaryClick: PropTypes.func
};

AccountView.defaultProps = {
  primaryClick: null
};

export default AccountView;
