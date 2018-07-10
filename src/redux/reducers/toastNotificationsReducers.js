import { toastNotificationTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  toasts: [],
  paused: false,
  displayedToasts: 0
};

const toastNotificationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case toastNotificationTypes.TOAST_ADD:
      const newToast = {
        header: action.header,
        message: action.message,
        alertType: action.alertType,
        persistent: action.persistent
      };

      return {
        ...state,
        ...{
          toasts: [...state.toasts, newToast],
          displayedToasts: state.displayedToasts + 1
        }
      };

    case toastNotificationTypes.TOAST_REMOVE:
      const displayedToast = state.toasts.find(toast => !toast.removed);
      let updatedToasts = [];

      if (displayedToast) {
        updatedToasts = [...state.toasts];
        updatedToasts[state.toasts.indexOf(action.toast)].removed = true;
      }

      return {
        ...state,
        ...{
          toasts: updatedToasts
        }
      };

    case toastNotificationTypes.TOAST_PAUSE:
      return {
        ...state,
        ...{
          paused: true
        }
      };

    case toastNotificationTypes.TOAST_RESUME:
      return {
        ...state,
        ...{
          paused: false
        }
      };

    default:
      if (new RegExp(helpers.REJECTED_ACTION(), 'i').test(action.type)) {
        const httpStatus = helpers.getStatusFromResults(action.payload);

        if (httpStatus === 0 || httpStatus >= 500) {
          const applicationToast = {
            header: 'Error',
            message: helpers.getErrorMessageFromResults(action.payload),
            alertType: 'error',
            persistent: true
          };

          return {
            ...state,
            ...{
              toasts: [...state.toasts, applicationToast],
              displayedToasts: state.displayedToasts + 1
            }
          };
        }
      }

      return state;
  }
};

toastNotificationsReducers.initialState = initialState;

export { toastNotificationsReducers as default, initialState, toastNotificationsReducers };
