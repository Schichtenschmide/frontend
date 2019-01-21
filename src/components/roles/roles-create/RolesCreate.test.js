import React from 'react';
import RolesCreate from "./RolesCreate";
import { shallow } from 'enzyme';

describe('<RolesCreate />', () => {
    test('Simulate wrong fieldata (validation)', () => {
        const wrapper = shallow(<RolesCreate />);
        wrapper.setState({roleName:""});
        wrapper.find('input[type="submit"]').simulate("click");
        expect(wrapper.instance().validator.errorMessages.roleName).not.toBeNull();
    });
});