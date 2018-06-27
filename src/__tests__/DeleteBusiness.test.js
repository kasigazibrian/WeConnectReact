import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import DeleteBusiness from '../components/business/DeleteBusiness';
import { MemoryRouter }    from 'react-router-dom';
import NavigationBar from '../components/home/NavigationBar';

let store = {};
window.localStorage = {
    getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
}

describe('DeleteBusiness Component',  ()=>{
    const mock = new MockAdapter(axios);
    mock.onDelete('http://localhost:5000/api/v2/businesses/1').reply(200,
    {
        Message: "Business has been deleted successfully", 
        Status: "Success"
    })
    
    it('Deletes a business successfully ', ()=>{
        let store = {};
        window.localStorage = {
            getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
            setItem: (key, value)=> { store[key] = value},
            removeItem: key => Reflect.deleteProperty(store, key)
        }
        let getAuth = ()=>{
            return false
        };
        const wrapper = mount(<MemoryRouter initialEntries={[ { pathname: '/delete_business/:business_id', key: 'testKey' } ]}><DeleteBusiness  match={{params: { business_id: 1} }} getAuth={getAuth}/></MemoryRouter>);
        // const deleteBusinessComponent = wrapper.find(DeleteBusiness).dive()
        
    })
    // it("Test it renders correctly", ()=>{
    //     expect(wrapper.find(DeleteBusiness)).to.have.length(1)
    //     expect(wrapper.find(NavigationBar)).to.have.length(1)


    // });

   
    
});