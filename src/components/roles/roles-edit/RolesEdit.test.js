import React from 'react';
import RolesEdit from "./RolesEdit";
import { shallow } from 'enzyme';

describe('<RolesEdit />', () => {
    test('Simulate wrong fieldata (validation)', () => {
        const wrapper = shallow(<RolesEdit />);
        wrapper.setState({roleName:""});
        wrapper.find('input[type="submit"]').simulate("click");
        expect(wrapper.instance().validator.errorMessages.roleName).not.toBeNull();
    });
});