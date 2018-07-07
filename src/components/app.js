import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { withRouter } from 'react-router';
import { Router } from './router/router';
import { connect } from '../redux';
import { i18nInit } from './i18n/i18n';
import Authentication from './authentication/authentication';
import Masthead from './masthead/masthead';
import AccountWizard from './accountWizard/accountWizard';
import ConfirmationModal from './confirmationModal/confirmationModal';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';

const App = ({ locale, localeVersion }) => (
  <I18nextProvider i18n={i18nInit(locale, localeVersion)}>
    <Authentication>
      <div className="layout-pf layout-pf-fixed">
        <Masthead />
        <div>
          <ToastNotificationsList />
          <AccountWizard />
          <ConfirmationModal />
          <Router />
        </div>
      </div>
    </Authentication>
  </I18nextProvider>
);

App.propTypes = {
  locale: PropTypes.string,
  localeVersion: PropTypes.string
};

App.defaultProps = {
  locale: null,
  localeVersion: null
};

const mapStateToProps = state => ({ locale: state.user.session.locale, localeVersion: state.user.session.localeVersion });

const ConnectedApp = withRouter(connect(mapStateToProps)(App));

export { ConnectedApp as default, ConnectedApp, App };
