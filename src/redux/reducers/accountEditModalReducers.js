import { accountTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  account: {},
  error: false,
  errorMessage: null,
  pending: false,
  fulfilled: false,
  show: false
};

const accountEditModalReducers = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes.EDIT_ACCOUNT_SHOW:
      return helpers.setStateProp(
        null,
        {
          account: action.account,
          show: true
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.EDIT_ACCOUNT_HIDE:
      return helpers.setStateProp(
        null,
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    // FixMe: API - patch not allowed by preflight, temporarily using put instead which uses "UPDATE_ACCOUNT"
    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        null,
        {
          error: action.error,
          errorMessage: helpers.getMessageFromResults(action.payload),
          fulfilled: false,
          pending: false
        },
        {
          state,
          reset: false
        }
      );

    // FixMe: API - patch not allowed by preflight, temporarily using put instead which uses "UPDATE_ACCOUNT"
    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        null,
        {
          error: false,
          errorMessage: null,
          fulfilled: false,
          pending: true
        },
        {
          state,
          reset: false
        }
      );

    // FixMe: API - patch not allowed by preflight, temporarily using put instead which uses "UPDATE_ACCOUNT"
    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        null,
        {
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    default:
      return state;
  }
};

accountEditModalReducers.initialState = initialState;

export { accountEditModalReducers as default, initialState, accountEditModalReducers };
