import { accountImagesReducers } from '../';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';
import apiTypes from '../../../constants/apiConstants';

describe('AccountImagesReducers', () => {
  it('should return the initial state', () => {
    expect(accountImagesReducers.initialState).toBeDefined();
  });

  it('should handle all defined error types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.REJECTED_ACTION(value),
        error: true,
        payload: {
          message: 'MESSAGE',
          response: {
            status: 0,
            statusText: 'ERROR TEST',
            data: {
              detail: 'ERROR'
            }
          }
        }
      };

      const resultState = accountImagesReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountImagesReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            [apiTypes.API_RESPONSE_IMAGES]: ['success']
          }
        }
      };

      const resultState = accountImagesReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
