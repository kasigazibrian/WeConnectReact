import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import LoginForm from "../Loginform";



describe('Login Component', ()=>{
    const wrapper = shallow(<LoginForm/>);

    it("Test it renders correctly", ()=>{
        // expect(shallowToJson(wrapper))
        expect(wrapper).toMatchSnapshot();
    });

});