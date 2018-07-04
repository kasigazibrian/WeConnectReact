import React from 'react';
import { shallow, mount } from 'enzyme';
import UserProfile from "../components/user/UserProfile";
import axios from 'axios'
import { MemoryRouter }    from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import NavigationBar from '../components/home/NavigationBar';
import Config from '../App.config'


describe('User Profile Component', ()=>{
    
    let mock = new MockAdapter(axios);
    mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/reset-password`).reply(201,
        {
            Message: 'You password has been reset successfully',
            Status: "Success"}
    )
    mock.onGet(`${Config.API_BASE_URL}/api/v2/auth/register`).reply(201,
        {
            Message: "User information retrieved successfully",
            Status: "Success",
            User: {
              username: "brian",
              email: "brian.kasigazi@andela.com",
              first_name: "Kasigazi",
              last_name: "Brian",
              gender: "male"
            },
            "Businesses": [
              {
                business_id: 1,
                business_owner_id: 1,
                business_name: "Mediacom",
                business_email: "mediacom@gmail.com",
                business_location: "Kampala",
                contact_number: "256781712929",
                business_category: "Real Estate",
                business_description: "This business provides the best video coverage"
              },
              {
                business_id: 2,
                business_owner_id: 1,
                business_name: "Toyota",
                business_email: "toyota@gmail.com",
                business_location: "Wakiso",
                contact_number: "256781712929",
                business_category: "Automobiles",
                business_description: "This business provides the best and latest cars. For example Toyota HIACE "
              },
              {
                business_id: 3,
                business_owner_id: 1,
                business_name: "Aiwa Limited",
                business_email: "aiwa@gmail.com",
                business_location: "USA",
                contact_number: "256784745678",
                business_category: "Computers & Electronics",
                business_description: "This business has all the electronic equipment required for example radios and Tv sets"
              }]
            }
    )
    
   
    it("Test it mounts correctly", ()=>{
        const wrapper = shallow(<UserProfile/>);
        expect(wrapper).toHaveLength(1)
        expect(wrapper.find(NavigationBar)).toHaveLength(1)


    });
  
    it('check it changes state on change of reset password modal', ()=>{
        const wrapper = shallow(<MemoryRouter><UserProfile/></MemoryRouter>);
        let userProfileComponent = wrapper.find(UserProfile).dive()
       
        let password = userProfileComponent.find('#new_password')
        password.simulate('change', {target: {name: "password",value: 'mango'}})
        let confirmPassword = userProfileComponent.find('#confirm_password_input')
        confirmPassword.simulate('change', {target: {name: "confirmPassword", value: 'mango'}});
        expect(userProfileComponent.state('confirmPassword')).toBe('mango');  
        expect(userProfileComponent.state('password')).toBe('mango');

    });

    it('Password toggle method to be functional', ()=>{
        const wrapper = mount(<UserProfile/>)
        wrapper.instance().togglePasswordResetModal()
        expect(wrapper.state('modal')).toBe(true)

    })


    it('Submits the password reset form', async ()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        let userProfileComponent = mount(<UserProfile/>);
        userProfileComponent.setState({password: "mango", confirmPassword: "mango"})
        const form = userProfileComponent.find('form')
        await userProfileComponent.setState({valid: true},()=>{
            form.simulate('submit', {preventDefault: ()=>{}})
            expect(userProfileComponent.state("modal")).toBe(false)
        })
        
          

    })
    it("has the heading", ()=>{
        const wrapper = shallow(<UserProfile/>);
        expect(wrapper.find('h1#userprofile').text()).toContain("User Profile")

    })
    it("has the warning information", ()=>{
        const wrapper = shallow(<UserProfile/>);
        expect(wrapper.find('h1#registered_businesses').text()).toContain("Your Registered Businesses")

    })
    it("has the businesses heading information", ()=>{
        const wrapper = shallow(<UserProfile/>);
        expect(wrapper.find('label#information').text()).toContain("You are trying to reset your password. If you CANCEL, your password will not be changed.")

    })

    
    it('check it sets auth to false state when no token is provided', ()=>{
        let store = {};
        window.localStorage = {
            getItem: key =>{ return null},
            setItem: (key, value)=> { store[key] = value},
            removeItem: key => Reflect.deleteProperty(store, key)
            
        }
        const wrapper = shallow(<UserProfile/>)
        expect(wrapper.state('isAuthenticated')).toBe(false);  
        });

    it("Should catch server errors on password reset", ()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/reset-password`).networkError()
        let userProfileComponent = mount(<UserProfile/>);
        userProfileComponent.setState({password: "mango", confirmPassword: "mango"})
        const form = userProfileComponent.find('form')
        userProfileComponent.setState({valid: true},()=>{
            form.simulate('submit', {preventDefault: ()=>{}})
            expect(userProfileComponent.state("modal")).toBe(false)
        })
    })

    it('It should catch any server errors on page load',()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        mock.onGet(`${Config.API_BASE_URL}/api/v2/auth/register`).networkError()
        const wrapper = mount(<UserProfile/>)
    })
    it('check it verifies confirm password', async ()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        const wrapper =  shallow(<MemoryRouter><UserProfile/></MemoryRouter>);
        let userProfileComponent = wrapper.find(UserProfile).dive()
       
        let password = userProfileComponent.find('#new_password')
        password.simulate('change', {target: {name: "password",value: 'mango'}})
        expect(userProfileComponent.state('confirmPassword')).toBe('');  
        expect(userProfileComponent.state('password')).toBe('mango');
        expect(userProfileComponent.state('valid')).toBe(false)
    });

    it('Should confirm passwords match on submit', ()=>{
            const wrapper = mount(<UserProfile/>)
            wrapper.setState({password: "mango", confirmPassword: "sdsd"}, ()=>{
                const form = wrapper.find('form')
                form.simulate('submit')
        
        })
    })
         
   
});