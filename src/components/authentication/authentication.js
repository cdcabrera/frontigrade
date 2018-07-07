import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Card, Form, Grid } from 'patternfly-react';
import { connect, reduxActions } from '../../redux';
import { fieldValidation } from '../formField/formField';
import I18nDropdown from '../i18n/i18n';
import helpers from '../../common/helpers';
import titleImg from '../../styles/images/title.svg';

class Authentication extends React.Component {
  state = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
    remember: false,
    formTouched: false,
    formValid: false
  };

  static getDerivedStateFromProps(props, state) {
    let initialState = null;

    if (helpers.OC_MODE) {
      initialState = {
        email: (props.session.remember && props.session.storedEmail) || state.email || process.env.REACT_APP_DEV_USER,
        password: state.password || process.env.REACT_APP_DEV_PASSWORD,
        emailError: '',
        passwordError: '',
        formValid: true
      };
    } else if (props.session.remember && props.session.storedEmail) {
      initialState = {
        email: props.session.storedEmail,
        emailError: '',
        remember: props.session.remember
      };
    }

    return initialState;
  }

  componentDidMount() {
    const { session, checkUser, storeData, availableLocales } = this.props;

    availableLocales();

    if (!session.authorized) {
      checkUser();
      storeData();
    }
  }

  onChangeEmail = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'Email must be valid' : '';

    this.setState(
      {
        email: value,
        emailError: errorMessage,
        formTouched: true
      },
      () => this.isFormValid()
    );
  };

  onChangePassword = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'Password must be valid' : '';

    this.setState(
      {
        password: value,
        passwordError: errorMessage,
        formTouched: true
      },
      () => this.isFormValid()
    );
  };

  onChangeRemember = event => {
    const { checked } = event.target;
    const { storeEmail } = this.props;

    if (!checked) {
      storeEmail(null).then(() =>
        this.setState({
          remember: checked
        })
      );
    } else {
      this.setState({
        remember: checked
      });
    }
  };

  onLogin = event => {
    const { email, password, remember, formValid } = this.state;
    const { checkUser, loginUser, storeEmail } = this.props;

    event.preventDefault();

    if (formValid) {
      this.setState(
        {
          formTouched: false,
          password: '',
          passwordError: null
        },
        () =>
          loginUser({
            username: email,
            password
          }).then(() => {
            if (remember) {
              storeEmail(email);
            } else {
              this.setState(
                {
                  email: '',
                  emailError: null
                },
                () => storeEmail(null)
              );
            }

            return checkUser();
          })
      );
    }
  };

  isFormValid() {
    const { emailError, passwordError } = this.state;
    const formValid = emailError === '' && passwordError === '';

    this.setState({
      formValid
    });
  }

  static renderLoading(message = 'Loading...') {
    return (
      <Card className="cloudmeter-login-loading-card">
        <Card.Body>
          <div className="spinner spinner-xl" />
          <div className="text-center">{message}</div>
        </Card.Body>
      </Card>
    );
  }

  renderLogin() {
    const { email, emailError, formTouched, password, passwordError, remember } = this.state;
    const { session, t } = this.props;

    return (
      <Card className="cloudmeter-login-card">
        <header className="login-pf-header">
          <I18nDropdown />
          <select className="selectpicker">
            <option>English</option>
          </select>
          <h1>{t('authentication.title', 'Log In to Your Account')}</h1>
        </header>
        <Card.Body>
          <Form method="post" autoComplete={remember ? 'on' : 'off'} onSubmit={this.onLogin}>
            <div className="cloudmeter-login-card-error help-block" aria-live="polite">
              {(!formTouched && session.error && session.loginFailed) ||
              (emailError !== '' && emailError !== null) ||
              (passwordError !== '' && passwordError !== null)
                ? 'Email address or password is incorrect.'
                : null}
            </div>
            <Form.FormGroup controlId="email">
              <Form.ControlLabel srOnly>Email address</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="email"
                value={email}
                placeholder="Email address"
                required
                name="email"
                onChange={this.onChangeEmail}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="password">
              <Form.ControlLabel srOnly>Password</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="password"
                value={password}
                placeholder="Password"
                required
                name="password"
                onChange={this.onChangePassword}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="remember" className="login-pf-settings cloudmeter-login-settings">
              <Form.Checkbox
                name="remember"
                checked={remember}
                inline
                className="checkbox-label"
                onChange={this.onChangeRemember}
              >
                Remember email address
              </Form.Checkbox>
              <Button bsStyle="link" className="sr-only">
                Forgot password?
              </Button>
            </Form.FormGroup>
            <Button type="submit" bsStyle="primary" bsSize="large" className="btn-block">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  render() {
    const { children, session } = this.props;

    if (session.authorized) {
      return children;
    }

    return (
      <div className="login-pf cloudmeter-login cloudmeter-fadein">
        <div className="login-pf-page cloudmeter-login-body">
          <div className="container-fluid">
            <Grid.Row>
              <Grid.Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
                <header className="login-pf-page-header">
                  <img className="login-pf-brand cloudmeter-login-brand" src={titleImg} alt="Cloud Meter" />
                </header>
                <Grid.Row>
                  <Grid.Col sm={10} smOffset={1} md={8} mdOffset={2} lg={8} lgOffset={2}>
                    {!session.pending && this.renderLogin()}
                    {session.pending && Authentication.renderLoading()}
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
          </div>
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  t: PropTypes.func,
  checkUser: PropTypes.func,
  children: PropTypes.node.isRequired,
  loginUser: PropTypes.func,
  session: PropTypes.shape({
    error: PropTypes.bool,
    loginFailed: PropTypes.bool,
    authorized: PropTypes.bool,
    pending: PropTypes.bool,
    storedEmail: PropTypes.string,
    remember: PropTypes.bool
  }),
  storeData: PropTypes.func,
  storeEmail: PropTypes.func,
  availableLocales: PropTypes.func
};

Authentication.defaultProps = {
  t: helpers.noop,
  checkUser: helpers.noop,
  loginUser: helpers.noop,
  session: {},
  storeData: helpers.noop,
  storeEmail: helpers.noop,
  availableLocales: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(reduxActions.user.checkUser()),
  loginUser: data => dispatch(reduxActions.user.loginUser(data)),
  storeData: data => dispatch(reduxActions.user.storeData(data)),
  storeEmail: email => dispatch(reduxActions.user.storeEmail(email)),
  availableLocales: () => dispatch(reduxActions.user.availableLocales())
});

const mapStateToProps = state => ({ session: state.user.session });

const ConnectedAuthentication = connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('default')(Authentication));

export { ConnectedAuthentication as default, ConnectedAuthentication, Authentication };
