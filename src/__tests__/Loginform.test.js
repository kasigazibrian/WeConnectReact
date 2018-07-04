import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import LoginForm from "../components/user/Loginform";
import axios from 'axios'
import { MemoryRouter }    from 'react-router-dom';
// import moxios from 'moxios'
import MockAdapter from 'axios-mock-adapter';
// import NavigationBar from "../NavigationBar";
// import mockAxios from 'jest-mock-axios';
// import mockAxios from '../__mocks__/axios';


describe('Login Component', ()=>{

    const wrapper = shallow(<MemoryRouter><LoginForm/></MemoryRouter>);
    let mock = new MockAdapter(axios);
    it("Test it mounts correctly", ()=>{
        
    
        // let spy = jest.spyOn(LoginForm.prototype, "handleSubmit");
        // console.log(LoginForm.prototype);
        // const wrapper = mount(<LoginForm />);
        // expect(shallowToJson(wrapper))
        // console.log(wrapper.instance());
        // const form = wrapper.find('form')
        expect(wrapper).toHaveLength(1)
        // expect(nav).toHaveLength(1)
        // console.log(form.props())
        // let username = form.find("input[name='username']");
        // console.log(username.props())
        // console.log(form);
        // username.instance().value = "brian";
        // console.log(username.instance().value)
        // console.log(username.instance().value)
        // form.simulate("submit")
        // console.log(wrapper.proptype)
        // expect(spy).toHaveBeenCalled()


    });
  
    it('check it changes state on input change', ()=>{
        const loginComponent = wrapper.find(LoginForm).dive()
        let username = loginComponent.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'Mary'}});
        let password = loginComponent.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        expect(loginComponent.state('username')).toBe('Mary');  
        expect(loginComponent.state('password')).toBe('mango');

    });

    it('Submits the login form', async ()=>{

       await mock.onPost('http://localhost:5000/api/v2/login').reply(201,
         {
            Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI",
            Message: "You have successfully logged in",
            Status: "Success",
            User: {
              username: "brian",
              email: "brian.kasigazi@andela.com",
              first_name: "Kasigazi",
              last_name: "Brian",
              gender: "male"
            }
          })
           const loginComponent = wrapper.find(LoginForm).dive()
           let username = loginComponent.find('input[name="username"]')
           username.simulate('change', {target: {name: "username",value: 'Mary'}});
           let password = loginComponent.find('input[name="password"]')
           password.simulate('change', {target: {name: "password",value: 'mango'}});
           const form = loginComponent.find('form')
           form.simulate('submit', {preventDefault: ()=>{}})
           expect(loginComponent.state("isAuthenticated")).toBe(false)
          

    })
    it("has the heading", ()=>{
        const loginComponent = wrapper.find(LoginForm).dive()
        expect(loginComponent.find('h1.my-h1').text()).toContain("Please Sign in")

    })
   
   
});