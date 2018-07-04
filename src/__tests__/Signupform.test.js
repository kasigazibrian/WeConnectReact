import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import SignupForm from "../components/user/SignupForm";
// import mockAxios from '../__mocks__/axios';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { MemoryRouter }    from 'react-router-dom';

describe('Signup Component', ()=>{

    const wrapper = shallow(<MemoryRouter><SignupForm/></MemoryRouter>);
    const mock = new MockAdapter(axios);

    mock.onPost(`http://localhost:5000/api/v2/auth/register`).reply(201,
         {
            Message: "User Mary has been registered successfully",
            Status: "Success"
          })
    
    it("Test it renders correctly", ()=>{
        expect(wrapper.find(SignupForm)).toHaveLength(1)


    });

    it('Should have a heading',()=>{
        const signUpComponent = wrapper.find(SignupForm).dive()
        expect(signUpComponent.find('h1.my-h1').text()).toContain("Please Sign up")
    })
     
    it('Should have a sign up button',()=>{
        const signUpComponent = wrapper.find(SignupForm).dive()
        expect(signUpComponent.find('button.btn').text()).toContain("Sign up")
    })
    // it('Wrong confirm password', ()=>{
    //     const form = wrapper.find('form')
    //     form.simulate('submit')
    // })

    it('check it changes state on input change', ()=>{
        const signUpComponent = mount(<SignupForm/>)
        let username = signUpComponent.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'mary'}});
        // wrapper.find('form')
        let password = signUpComponent.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        let first_name = signUpComponent.find('input[name="first_name"]')
        first_name.simulate('change', {target: {name: "first_name",value: 'Mary'}});

        let last_name = signUpComponent.find('input[name="last_name"]')
        last_name.simulate('change', {target: {name: "last_name",value: 'Lucy'}});
        let email = signUpComponent.find('input[name="last_name"]')
        email.simulate('change', {target: {name: "email",value: 'mary@gmail.com'}});
       
        // console.log( wrapper.find('form').props())
        expect(signUpComponent.state('username')).toBe('mary');  
        expect(signUpComponent.state('password')).toBe('mango');
        expect(signUpComponent.state('first_name')).toBe('Mary');
        expect(signUpComponent.state('last_name')).toBe('Lucy');
    });

    it('It handles submit', async ()=>{
        const signUpComponent = wrapper.find(SignupForm).dive()
        let confirmPassword = signUpComponent.find('input[name="confirmPassword"]')
        confirmPassword.simulate('change', {target: {name: "confirmPassword",value: 'mango'}});

        let password = signUpComponent.find('#password-input')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        const form = signUpComponent.find('form')
        
        await form.simulate('submit',  { preventDefault: ()=>{}})
        
    });
   

    it('It checks the password strength',() =>{
        const signUpComponent = mount(<SignupForm/>)
        let password = signUpComponent.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        expect(signUpComponent.state('score')).toBe(1);
        expect(signUpComponent.state('suggestions')).toContain('Add another word or two. Uncommon words are better.');
        password.simulate('change', {target: {name: "password",value: 'mango1231321AA'}});
        expect(signUpComponent.state('score')).toBe(4);
        password.simulate('change', {target: {name: "password",value: 'mangoAgain'}});
        expect(signUpComponent.state('score')).toBe(2);
        password.simulate('change', {target: {name: "password",value: 'mango123...'}});
        expect(signUpComponent.state('score')).toBe(3);

    })
   
           

});