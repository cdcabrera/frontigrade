import * as accountTypes from './accountConstants';
import * as applicationStatusTypes from './applicationStatusConstants';
import * as confirmationModalTypes from './confirmationModalConstants';
import * as reportTypes from './reportConstants';
import * as systemConfigTypes from './systemConfigConstants';
import * as toastNotificationTypes from './toastNotificationConstants';
import * as filterTypes from './filterConstants';
import * as userTypes from './userConstants';

const reduxTypes = {
  account: accountTypes,
  applicationStatus: applicationStatusTypes,
  confirmationModal: confirmationModalTypes,
  filter: filterTypes,
  report: reportTypes,
  systemConfig: systemConfigTypes,
  toastNotifications: toastNotificationTypes,
  user: userTypes
};

export {
  reduxTypes as default,
  reduxTypes,
  accountTypes,
  applicationStatusTypes,
  confirmationModalTypes,
  filterTypes,
  reportTypes,
  systemConfigTypes,
  toastNotificationTypes,
  userTypes
};
