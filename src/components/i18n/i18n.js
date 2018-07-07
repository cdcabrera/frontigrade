import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { reactI18nextModule, translate } from 'react-i18next';
import i18nextChained from 'i18next-chained-backend';
import i18nextLocalstorage from 'i18next-localstorage-backend';
import i18nextXhr from 'i18next-xhr-backend';
import { connect, reduxActions } from '../../redux';
import helpers from '../../common/helpers';

const i18nInit = (lng = 'en', version = 'v0.0.0') =>
  i18next
    .use(i18nextXhr)
    .use(reactI18nextModule)
    .init({
      backend: {
        loadPath: process.env.REACT_APP_CONFIG_SERVICE_LOCALES_PATH
      },
      fallbackLng: 'en',
      lng,
      ns: ['default'],
      defaultNS: 'default',
      react: {
        wait: true
      }
    });
/*
    .use(i18nextChained)
    .use(reactI18nextModule)
    .init({
      backend: {
        backends: [i18nextLocalstorage, i18nextXhr],
        backendOptions: [
          {
            expirationTime: parseInt(process.env.REACT_APP_CONFIG_SERVICE_LOCALES_EXPIRE, 10),
            versions: { [lng]: version }
          },
          {
            loadPath: process.env.REACT_APP_CONFIG_SERVICE_LOCALES_PATH
          }
        ]
      },
      lng,
      // fallbackLng: 'en',
      ns: ['default'],
      defaultNS: 'default',
      react: {
        wait: true
      }
    });
    */

const I18nDropdown = ({ session, storeLocale }) => {
  const onSelectLocale = event => {
    // console.log(event.target.getAttribute('data-version'));
    console.log(
      session.availableLocales[event.target.value].value,
      `v${session.availableLocales[event.target.value].version}`
    );
    storeLocale(
      session.availableLocales[event.target.value].value,
      `v${session.availableLocales[event.target.value].version}`
    );
  };

  // if (session.locale && i18n.language !== session.locale && session.locale !== '') {
  // i18n.changeLanguage(session.locale);
  // }

  return (
    <select onChange={onSelectLocale}>
      {session.availableLocales &&
        session.availableLocales.map((val, index) => (
          <option key={val.value} value={index} data-version={val.version} selected={val.value === session.locale}>
            {val.key}
          </option>
        ))}
    </select>
  );
};

I18nDropdown.propTypes = {
  storeLocale: PropTypes.func,
  // i18n: PropTypes.shape({
  //   changeLanguage: PropTypes.func
  // }),
  session: PropTypes.shape({
    availableLocales: PropTypes.array,
    locale: PropTypes.string
  })
};

I18nDropdown.defaultProps = {
  storeLocale: helpers.noop,
  // i18n: {
  // changeLanguage: helpers.noop
  // },
  session: {
    availableLocales: [],
    locale: null
  }
};

const mapDispatchToProps = dispatch => ({
  storeLocale: (locale, localVersion) => dispatch(reduxActions.user.storeLocale(locale, localVersion))
});

const mapStateToProps = state => ({ session: state.user.session });

const ConnectI18nDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('default')(I18nDropdown));

export { ConnectI18nDropdown as default, i18nInit, ConnectI18nDropdown, I18nDropdown };
