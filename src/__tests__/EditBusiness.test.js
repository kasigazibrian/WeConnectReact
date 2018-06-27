import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import EditBusiness from "../components/business/Editbusiness";
// import mockAxios from '../__mocks__/axios';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";

import { MemoryRouter }    from 'react-router-dom';


global.getAuth = ()=>{
    return false
}
let store = {};
window.localStorage = {
    getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
}
describe('Signup Component', ()=>{

    const wrapper = mount(<MemoryRouter  match={{params: { business_id: 1} } }><EditBusiness getAuth={getAuth} match={{params: { business_id: 1} } }/></MemoryRouter>);
    const mock = new MockAdapter(axios);

    mock.onPut(`http://localhost:5000/api/v2/businesses/1`).reply(201,
        {
            Message: "Business has been updated successfully",
            Status: "Success"
        })
        mock.onGet(`http://localhost:5000/api/v2/businesses/1`).reply(200,
             {
                page: 1,
                limit: 20,
                count: 2,
                number_of_pages: 1,
                previous: null,
                next: null,
                Businesses: [
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
                    business_id: 3,
                    business_owner_id: 1,
                    business_name: "BMW",
                    business_email: "bmw@gmail.com",
                    business_location: "Kabale",
                    contact_number: "256781712926",
                    business_category: "Automobiles",
                    business_description: "This business provides the best cars"
                  }
                ],
                "Status": "Success"
              
        })
    // it('it matches snapshot', () => {
    //     expect(wrapper.find(EditBusiness)).toMatchSnapshot();
    // })
    
    it("Test it renders correctly", ()=>{
        expect(wrapper).toHaveLength(1)
        const item = wrapper.find(EditBusiness)

    });

    it('Should have a heading',()=>{
        expect(wrapper.find('h1#heading').text()).toContain("Edit Business")
    })
     
    it('Should have a register button',()=>{
        expect(wrapper.find('button.btn').text()).toContain("Save Changes")
    })
   
    it('check it changes state on input change', ()=> {
        let businessName = wrapper.find('input[name="business_name"]')
        businessName.simulate('change', {target: {name: "business_name",value: 'Supercom Limited'}});
        
        // wrapper.find('form')
        let businessLocation = wrapper.find('input[name="business_location"]')
        businessLocation.simulate('change', {target: {name: "business_location",value: 'Kampala'}});

        let businessEmail = wrapper.find('input[name="business_email"]')
        businessEmail.simulate('change', {target: {name: "business_email",value: 'supercom@gmail.com'}});
       
        let contactNumber = wrapper.find('input[name="contact_number"]')
        contactNumber.simulate('change', {target: {name: "contact_number",value: '256781712927'}});

        let businessDescription = wrapper.find('textarea[name="business_description"]')
        businessDescription.simulate('change', {target: {name: "business_description", value: 'This business provides the best services'}});
       
        let businessCategory = wrapper.find('select[name="businessCategory"]')
        businessCategory.simulate('change', {target: {name: "business_category", value: 'Entertainment'}});
        // console.log(wrapper.state())
        // expect(wrapper.state('business_name')).toBe('Supercom Limited');  
        // expect(wrapper.state('business_location')).toBe('Kampala');
        // expect(wrapper.state('business_email')).toBe('supercom@gmail.com');
        // expect(wrapper.state('contact_number')).toBe('256781712927');
        // expect(wrapper.state('business_description')).toBe('This business provides the best services');
        // expect(wrapper.state('business_category')).toBe('Entertainment');
    });

    it('It handles submit', async ()=>{
        let store = {};
        window.localStorage = {
                getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
                setItem: (key, value)=> { store[key] = value},
                removeItem: key => Reflect.deleteProperty(store, key)
        }
        let businessName = wrapper.find('input[name="business_name"]')
        businessName.simulate('change', {target: {name: "business_name",value: 'Supercom Limited'}});
        // wrapper.find('form')
        
        const form = wrapper.find('form')
        await form.simulate('submit',  { preventDefault: ()=>{}})
        
    });
   
});