import React from 'react';
import ShiftCreate from "./ShiftCreate";
import { shallow } from 'enzyme';

describe('<ShiftCreate />', () => {
    test('Simulate wrong fieldata (validation)', () => {
        const wrapper = shallow(<ShiftCreate />);
        wrapper.setState({name:""});
        wrapper.setState({startTime:""});
        wrapper.setState({endTime:""});
        wrapper.setState({employeeCount:""});
        wrapper.setState({roleId:""});
        wrapper.find('input[type="submit"]').simulate("click");
        expect(wrapper.instance().validator.errorMessages.name).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.startTime).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.endTime).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.employeeCount).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.roleId).not.toBeNull();
    });
});