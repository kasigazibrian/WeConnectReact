import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios'
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import LogOut from '../components/user/Logout';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter }    from 'react-router-dom';
import NavigationBar from '../components/home/NavigationBar';

let store = {};
window.localStorage = {
    getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
}

describe('Logout Component',  ()=>{
    const mock = new MockAdapter(axios);
    const wrapper = mount(<MemoryRouter initialEntries={['/logout']}><LogOut/></MemoryRouter>);
    
    mock.onPost('http://localhost:5000/api/v2/auth/logout').reply(201,
        {
             Message: "You have successfully logged out",
             Status: "Success"
        })
    let spy = jest.spyOn(axios, 'post');
    
    it('Logs out a user ', ()=>{
        const logOutComponent = wrapper.find(LogOut)
        // expect(localStorage.getItem).to.be.called.with('token')
    })
    it("Test it renders correctly", ()=>{
        expect(wrapper.find(LogOut)).to.have.length(1)
        expect(wrapper.find(NavigationBar)).to.have.length(1)


    });

   
    
});