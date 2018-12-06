import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import helpers from '../../../common/helpers';
import { ConnectedAccountImagesView, AccountImagesView } from '../accountImagesView';

describe('AccountImagesView Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ account: {}, filter: { account: {} } });
    const component = shallow(<ConnectedAccountImagesView />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component with empty state', () => {
    const props = {
      history: {
        push: helpers.noop
      }
    };

    const component = mount(<AccountImagesView {...props} />);

    expect(component.find('button').length).toEqual(1);
    expect(component.render()).toMatchSnapshot('empty state');
  });

  it('should render a non-connected component in pending state', () => {
    const props = {
      pending: true,
      history: {
        push: helpers.noop
      }
    };

    const component = shallow(<AccountImagesView {...props} />);

    expect(component.render()).toMatchSnapshot('pending');

    component.setProps({
      images: [
        {
          cloud_image_id: 'ami-rhel7',
          id: 2,
          instances_seen: 2,
          is_encrypted: false,
          name: null,
          openshift: false,
          openshift_challenged: false,
          openshift_detected: false,
          rhel: true,
          rhel_challenged: false,
          rhel_detected: true,
          memory_seconds: 10000.0,
          runtime_seconds: 90362.5,
          vcpu_seconds: 5000.0,
          status: 'inspected'
        }
      ],
      filter: {
        dateFields: null,
        query: {}
      }
    });

    expect(component).toMatchSnapshot('pending with no visible list');
  });

  it('should render a non-connected component in fulfilled state', () => {
    const props = {
      fulfilled: true,
      history: {
        push: helpers.noop
      }
    };

    const component = shallow(<AccountImagesView {...props} />);

    expect(component.render()).toMatchSnapshot('fulfilled and empty');

    component.setProps({
      account: {
        fulfilled: true,
        data: {}
      },
      images: [],
      filter: {
        dateFields: null,
        query: {}
      }
    });

    expect(component).toMatchSnapshot('fulfilled with a empty list');

    component.setProps({
      account: {
        fulfilled: true,
        data: {}
      },
      images: [
        {
          cloud_image_id: 'ami-rhel7',
          id: 2,
          instances_seen: 2,
          is_encrypted: false,
          name: null,
          openshift: true,
          openshift_challenged: true,
          openshift_detected: false,
          rhel: true,
          rhel_challenged: false,
          rhel_detected: true,
          memory_seconds: 500.5,
          runtime_seconds: 2000.4,
          vcpu_seconds: 500.2,
          status: 'inspected'
        }
      ]
    });

    expect(component).toMatchSnapshot('fulfilled with a list');
  });
});
