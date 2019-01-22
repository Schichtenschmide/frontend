import React from 'react';
import EmployeeEdit from "./EmployeeEdit";
import { shallow } from 'enzyme';

describe('<EmployeeEdit />', () => {
    test('Simulate wrong fieldata (validation)', () => {
        const wrapper = shallow(<EmployeeEdit />);
        wrapper.setState({firstName:""});
        wrapper.setState({lastName:""});
        wrapper.setState({employmentRate:""});
        wrapper.setState({roleId:""});
        wrapper.find('input[type="submit"]').simulate("click");
        expect(wrapper.instance().validator.errorMessages.lastname).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.firstName).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.employmentRate).not.toBeNull();
        expect(wrapper.instance().validator.errorMessages.roleId).not.toBeNull();
    });
});