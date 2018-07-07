import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { connect, reduxTypes, reduxActions, store } from '../../redux';
import helpers from '../../common/helpers';

class AccountView extends React.Component {
  showAccountWizard = () => {
    store.dispatch({
      type: reduxTypes.account.ADD_ACCOUNT_SHOW
    });
  };

  render() {
    const { t, i18n, storeData } = this.props;

    const changeLanguage = lng => {
      console.log(i18n);
      i18n.changeLanguage(lng);

      storeData({ locale: lng });
      /*
      store.dispatch({
        type: reduxTypes.user,
        locale: lng
      });
      */
    };

    return (
      <Grid fluid>
        <Row>
          <EmptyState className="full-page-blank-slate">
            <EmptyState.Icon />
            <EmptyState.Title>{t('accountView.emptyState.title', 'Welcome to Cloud Meter')}</EmptyState.Title>
            <EmptyState.Info>
              {t('accountView.emptyState.info', 'Add an AWS account to monitor usage.')}
            </EmptyState.Info>
            <EmptyState.Action>
              <Button bsStyle="primary" bsSize="large" onClick={this.showAccountWizard}>
                {t('accountView.emptyState.button', 'Add Account')}
              </Button>
              <Button onClick={() => changeLanguage('fr')}>woot</Button>
            </EmptyState.Action>
          </EmptyState>
        </Row>
      </Grid>
    );
  }
}

AccountView.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func
  }),
  storeData: PropTypes.func
};

AccountView.defaultProps = {
  t: helpers.noop,
  i18n: {
    changeLanguage: helpers.noop
  },
  storeData: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  storeData: data => dispatch(reduxActions.user.storeData(data))
  // storeLocale: data => dispatch(reduxActions.user.storeLocale(data))
});

const mapStateToProps = state => ({ account: state.account });

const ConnectedAccountView = connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('default')(AccountView));

export { ConnectedAccountView as default, ConnectedAccountView, AccountView };
