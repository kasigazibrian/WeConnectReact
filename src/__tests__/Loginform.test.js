import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from "../components/user/Loginform";
import axios from 'axios'
import { MemoryRouter }    from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Config from '../App.config'


describe('Login Component', ()=>{

    const wrapper = shallow(<MemoryRouter><LoginForm/></MemoryRouter>);
    let mock = new MockAdapter(axios);
    it("Test it mounts correctly", ()=>{
        expect(wrapper).toHaveLength(1)

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
       await mock.onPost(`${Config.API_BASE_URL}/api/v2/login`).reply(201,
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
   it("Handles server errors", ()=>{
       const loginComponent = mount(<LoginForm/>)
        mock.onPost(`${Config.API_BASE_URL}/api/v2/login`).networkError()
        const form = loginComponent.find('form')
        form.simulate('submit', {preventDefault: ()=>{}})
       
      })

    it('Should call the post request method on submit', ()=>{
        mock.onPost(`${Config.API_BASE_URL}/api/v2/login`).reply(400,{
        Message: "Invalid username or password"})
        const wrapper = mount(<LoginForm/>)
        let spyPostRequest = jest.spyOn(wrapper.instance(), 'postRequest')
        let form = wrapper.find('form')
        form.simulate('submit')
        expect(spyPostRequest).toHaveBeenCalled()
        })
   
});