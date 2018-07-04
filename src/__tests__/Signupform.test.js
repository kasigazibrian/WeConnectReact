import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import SignupForm from "../SignupForm";
import mockAxios from '../__mocks__/axios';


describe('Signup Component', ()=>{

    const wrapper = mount(<SignupForm/>);
    
    
   
    // // let mockAdapter = new MockAdapter(axios);
    it("Test it renders correctly", ()=>{
        // let spy = jest.spyOn(LoginForm.prototype, "handleSubmit");
        // console.log(LoginForm.prototype);
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
    it('Should have a heading',()=>{
        expect(wrapper.find('h1.my-h1').text()).toContain("Please Sign up")
    })
     
    it('Should have a heading',()=>{
        expect(wrapper.find('button.btn').value()).toContain("Signup")
    })

    it('check it changes state on input change', ()=>{
        let username = wrapper.find('input[name="username"]')
        username.simulate('change', {target: {name: "username",value: 'mary'}});
        // wrapper.find('form')
        let password = wrapper.find('input[name="password"]')
        password.simulate('change', {target: {name: "password",value: 'mango'}});
        // console.log(username.instance())
        let first_name = wrapper.find('input[name="first_name"]')
        first_name.simulate('change', {target: {name: "first_name",value: 'Mary'}});

        let last_name = wrapper.find('input[name="last_name"]')
        last_name.simulate('change', {target: {name: "last_name",value: 'Lucy'}});
        let email = wrapper.find('input[name="last_name"]')
        email.simulate('change', {target: {name: "email",value: 'mary@gmail.com'}});
       
        console.log(wrapper.state())
        // console.log( wrapper.find('form').props())
        expect(wrapper.state('username')).toBe('mary');  
        expect(wrapper.state('password')).toBe('mango');
        expect(wrapper.state('first_name')).toBe('Mary');
        expect(wrapper.state('last_name')).toBe('Lucy');
    });

    // it('It handles submit', async ()=>{
       
    //     let catchFn = jest.fn(),
    //         thenFn = jest.fn();
    //     let username = wrapper.find('input[name="username"]')
    //     username.simulate('change', {target: {name: "username",value: 'Mary'}});
    //     let password = wrapper.find('input[name="password"]')
    //     password.simulate('change', {target: {name: "password",value: 'mango'}});
    //     mockAxios.post.mockImplementationOnce(() =>
    //         Promise.resolve({
    //         data: { Message: "User has been added successfully", Status: "Success"}
    //         })
            
    //     );
    //     const form = wrapper.find('form')
    //     await form.simulate('submit')
    //     // expect(wrapper.pre)
    //     expect(wrapper.state().is_authenticated).toBe(true)
    //     // expect(thenFn).toHaveBeenCalledWith();
         
    //     //     // catch should not have been called
    //     // expect(catchFn).not.toHaveBeenCalled(1);

       
    // })
      
   
        

});