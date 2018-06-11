import React from 'react';
import PropTypes from 'prop-types';
import { Wizard } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux/';

class AccountWizard extends React.Component {
  onCancel = () => {
    const { fulfilled, error } = this.props;

    const closeWizard = () => {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
      });

      store.dispatch({
        type: reduxTypes.account.UPDATE_ACCOUNT_HIDE
      });
    };

    if (fulfilled || error) {
      closeWizard();
    } else {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
        title: 'Cancel Add Account',
        heading: 'Are you sure you want to exit this wizard?',
        body: 'Exiting this wizard will cancel adding an account.',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        onConfirm: closeWizard
      });
    }
  };

  onNext = () => {};

  onBack = () => {};

  onSubmit = () => {};

  render() {
    const { show } = this.props;

    return (
      <Wizard show={show}>
        <Wizard.Header onClose={this.onCancel}>Header</Wizard.Header>
        <Wizard.Body>body...</Wizard.Body>
        <Wizard.Footer>footer</Wizard.Footer>
      </Wizard>
    );
  }
}

AccountWizard.propTypes = {
  show: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  fulfilled: PropTypes.bool
};

AccountWizard.defaultProps = {
  error: false,
  fulfilled: false
};

const mapStateToProps = state => ({ ...state.accountWizard });

export default connect(mapStateToProps)(AccountWizard);
