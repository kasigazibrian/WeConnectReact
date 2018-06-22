import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import LoginForm from "../Loginform";
// import axios from 'axios'
// import moxios from 'moxios'
// import MockAdapter from 'axios-mock-adapter';
// import NavigationBar from "../NavigationBar";
// import mockAxios from 'jest-mock-axios';
import mockAxios from '../__mocks__/axios';



describe('Login Component', ()=>{

    const wrapper = mount(<LoginForm />);
    
    
   
    // let mockAdapter = new MockAdapter(axios);
    it("Test it mounts correctly", ()=>{
        // let spy = jest.spyOn(LoginForm.prototype, "handleSubmit");
        // console.log(LoginForm.prototype);
        const wrapper = mount(<LoginForm/>);
        // expect(shallowToJson(wrapper))
        // console.log(wrapper.instance());
        // const form = wrapper.find('form')
        console.log(wrapper.length)
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
        let username = wrapper.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'Mary'}});
        // wrapper.find('form')
        let password = wrapper.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        // console.log(username.instance())
        console.log(wrapper.state())
        // console.log( wrapper.find('form').props())
        expect(wrapper.state('username')).toBe('Mary');  
        expect(wrapper.state('password')).toBe('mango');  
    });

    it('It handles submit', async ()=>{
       
        let catchFn = jest.fn(),
            thenFn = jest.fn();
        let username = wrapper.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'Mary'}});
        let password = wrapper.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
            data: { Message: "User has been added successfully", Status: "Success" , Token: "usertoken"}
            })
            
        );
        const form = wrapper.find('form')
        await form.simulate('submit')
        expect(wrapper.pre)
        expect(wrapper.state().is_authenticated).toBe(true)
        // expect(thenFn).toHaveBeenCalledWith();
         
        //     // catch should not have been called
        // expect(catchFn).not.toHaveBeenCalled(1);

       
    })
      
   
        

});