import React from 'react';
import { shallow, mount } from 'enzyme';
import SignupForm from "../components/user/SignupForm";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { MemoryRouter }    from 'react-router-dom';
import Config from '../App.config'

let store = {};
window.localStorage = {
    getItem: key =>{ return null},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
    
}
describe('Signup Component', ()=>{

    const wrapper = shallow(<MemoryRouter><SignupForm/></MemoryRouter>);
    const mock = new MockAdapter(axios);

    mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/register`).reply(201,
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
    it('check it changes state on input change', ()=>{
        const signUpComponent = mount(<SignupForm/>)
        let username = signUpComponent.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'mary'}});
        // wrapper.find('form')
        let password = signUpComponent.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        let firstName = signUpComponent.find('input[name="firstName"]')
        firstName.simulate('change', {target: {name: "firstName",value: 'Mary'}});

        let lastName = signUpComponent.find('input[name="lastName"]')
        lastName.simulate('change', {target: {name: "lastName",value: 'Lucy'}});
        let email = signUpComponent.find('input[name="email"]')
        email.simulate('change', {target: {name: "email",value: 'mary@gmail.com'}});
       
        expect(signUpComponent.state('username')).toBe('mary');  
        expect(signUpComponent.state('password')).toBe('mango');
        expect(signUpComponent.state('firstName')).toBe('Mary');
        expect(signUpComponent.state('lastName')).toBe('Lucy');
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
    it('It handles server errors', async ()=>{
        mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/register`).networkError()
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
        password.simulate('change', {target: {name: "password",value: ''}});
        expect(signUpComponent.state('score')).toBe(0);

    })
        it('should handle bad request errors',()=>{
			mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/register`).reply(400,
				{
                    Message: "Invalid email address",
                    Status: "Fail"
                })
				const signUpComponent = mount(<SignupForm/>)
				let spyOnHandleSubmit = jest.spyOn(signUpComponent.instance(), 'handleSubmit')
				signUpComponent.instance().handleSubmit( { preventDefault: ()=>{}})
				expect(spyOnHandleSubmit).toHaveBeenCalled()
		})
		it('should set state to false if token is null', ()=>{
		const signUpComponent = mount(<SignupForm/>)
		expect(signUpComponent.state('isAuthenticated')).toBe(false)
        })
        
        it('Should set state to true if token is not null', ()=>{
            let store = {};
            window.localStorage = {
                getItem: key =>{ return {"Token": "usertoken"}},
                setItem: (key, value)=> { store[key] = value},
                removeItem: key => Reflect.deleteProperty(store, key)
                
            }
            const wrapper = shallow(<MemoryRouter><SignupForm/></MemoryRouter>)
            const signUpComponent = wrapper.find(SignupForm).dive()
		    expect(signUpComponent.state('isAuthenticated')).toBe(true)
        })
   
           

});