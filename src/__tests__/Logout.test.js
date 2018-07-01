import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import LogOut from '../components/user/Logout';
import NavigationBar from '../components/home/NavigationBar';
import Config from '../App.config'

let store = {};
window.localStorage = {
    getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
}

describe('Logout Component',  ()=>{
    const mock = new MockAdapter(axios);
    mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/logout`).reply(201,
    {
         Message: "You have successfully logged out",
         Status: "Success"
    })

    
    it("Test it renders correctly", ()=>{
        const wrapper = mount(<LogOut/>);
        expect(wrapper.find(LogOut)).toHaveLength(1)
        expect(wrapper.find(NavigationBar)).toHaveLength(1)


    });

    it("Should catch invalid request response", ()=>{
        mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/logout`).reply(401,
        {
             Message: "Your session has expired. Please login again",
             Status: "Fail"
        })
        const wrapper = mount(<LogOut/>);
        let spyComponentDidMount= jest.spyOn(wrapper.instance(), 'componentDidMount')
        wrapper.instance().componentDidMount()
        expect(spyComponentDidMount).toHaveBeenCalled()

    })
    it("Should handle network error", ()=>{
        mock.onPost(`${Config.API_BASE_URL}/api/v2/auth/logout`).networkError()
        const wrapper = mount(<LogOut/>);
        let spyComponentDidMount= jest.spyOn(wrapper.instance(), 'componentDidMount')
        wrapper.instance().componentDidMount()
        expect(spyComponentDidMount).toHaveBeenCalled()

    })
    it("should set state to true if no token is found", ()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{ return null},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
          
      }
        const wrapper = mount(<LogOut history={{push: (route)=>{}}}/>);
    })
    it("Should redirect when a user successfully logs out ", async ()=>{
        const wrapper = mount(<LogOut history={{push: (route)=>{}}}/>)
        let spyLogOut = jest.spyOn(wrapper.instance(), 'componentDidMount')
        let spyPush = jest.spyOn(wrapper.props().history, 'push')
        wrapper.setState({hasLoggedOut: true})
        await wrapper.instance().componentDidMount()
        expect(spyLogOut).toHaveBeenCalled()
        expect(spyPush).toHaveBeenCalled()
    })

   
    
});