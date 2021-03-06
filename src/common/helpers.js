import _ from 'lodash';
import moment from 'moment/moment';

const generateId = prefix => `${prefix || 'generatedid'}-${Math.ceil(1e5 * Math.random())}`;

const generatePriorYearMonthArray = () => {
  const dateStart = moment().subtract(12, 'months');
  const dateEnd = moment().startOf('month');

  let timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push({
      title: dateStart.startOf('month').format('YYYY MMMM'),
      start: dateStart.startOf('month').toISOString(),
      end: dateStart.endOf('month').toISOString()
    });

    dateStart.add(1, 'month');
  }

  timeValues = timeValues.reverse();
  timeValues[0] = {
    title: 'Last 30 Days',
    start: moment()
      .startOf('day')
      .subtract(30, 'days')
      .toISOString(),
    end: moment()
      .endOf('day')
      .toISOString()
  };

  return { defaultTime: timeValues[0], timeValues };
};

const getMessageFromResults = (results, filterField = null) => {
  const status = _.get(results, 'response.status', results.status);
  const statusResponse = _.get(results, 'response.statusText', results.statusText);
  const messageResponse = _.get(results, 'response.data', results.message);
  const detailResponse = _.get(results, 'response.data', results.detail);

  if (status < 400 && !messageResponse && !detailResponse) {
    return statusResponse;
  }

  if (status >= 500 || (status === undefined && (messageResponse || detailResponse))) {
    return `${status || ''} Server is currently unable to handle this request. ${messageResponse ||
      detailResponse ||
      ''}`;
  }

  if (typeof messageResponse === 'string') {
    return messageResponse;
  }

  if (typeof detailResponse === 'string') {
    return detailResponse;
  }

  const getMessages = (messageObject, filterKey) => {
    const obj = filterKey ? messageObject[filterKey] : messageObject;

    return _.map(
      obj,
      next => {
        if (_.isArray(next)) {
          return getMessages(next);
        }

        return next;
      },
      null
    );
  };

  return _.join(getMessages(messageResponse || detailResponse, filterField), '\n');
};

const getStatusFromResults = results => {
  let status = _.get(results, 'response.status', results.status);

  if (status === undefined) {
    status = 0;
  }

  return status;
};

const noop = Function.prototype;

const setStateProp = (prop, data, options) => {
  const { state = {}, initialState = {}, reset = true } = options;
  let obj = { ...state };

  if (prop && !state[prop]) {
    console.error(`Error: Property ${prop} does not exist within the passed state.`, state);
  }

  if (reset && prop && !initialState[prop]) {
    console.warn(`Warning: Property ${prop} does not exist within the passed initialState.`, initialState);
  }

  if (reset && prop) {
    obj[prop] = {
      ...state[prop],
      ...initialState[prop],
      ...data
    };
  } else if (reset && !prop) {
    obj = {
      ...state,
      ...initialState,
      ...data
    };
  } else if (prop) {
    obj[prop] = {
      ...state[prop],
      ...data
    };
  } else {
    obj = {
      ...state,
      ...data
    };
  }

  return obj;
};

const prettyPrintJson = json => JSON.stringify(json, null, 2);

const DEV_MODE = process.env.REACT_APP_ENV === 'development';

const OC_MODE = process.env.REACT_APP_ENV === 'oc';

const FULFILLED_ACTION = (base = '') => `${base}_FULFILLED`;

const PENDING_ACTION = (base = '') => `${base}_PENDING`;

const REJECTED_ACTION = (base = '') => `${base}_REJECTED`;

const HTTP_STATUS_RANGE = status => `${status}_STATUS_RANGE`;

const helpers = {
  generateId,
  generatePriorYearMonthArray,
  getMessageFromResults,
  getStatusFromResults,
  noop,
  setStateProp,
  prettyPrintJson,
  DEV_MODE,
  OC_MODE,
  FULFILLED_ACTION,
  PENDING_ACTION,
  REJECTED_ACTION,
  HTTP_STATUS_RANGE
};

export { helpers as default, helpers };
