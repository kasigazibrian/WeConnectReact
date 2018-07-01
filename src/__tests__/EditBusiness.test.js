import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import EditBusiness from "../components/business/Editbusiness";
// import mockAxios from '../__mocks__/axios';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { MemoryRouter, StaticRouter }    from 'react-router-dom';


global.getAuth = ()=>{
    return false
}
global.match = {path: '/', url: "/edit_business/:business_id", params: {business_id: 1}, isExact: true }
let store = {};
window.localStorage = {
    getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
    setItem: (key, value)=> { store[key] = value},
    removeItem: key => Reflect.deleteProperty(store, key)
}
describe('Edit Business Component', ()=>{
    const wrapper = mount(<MemoryRouter initialEntries={['/edit_business/:business_id']}><EditBusiness match={match}/></MemoryRouter>);
    const mock = new MockAdapter(axios);

    mock.onPut(`http://localhost:5000/api/v2/businesses/1`).reply(201,
        {
            Message: "Business has been updated successfully",
            Status: "Success"
        })
        mock.onPut(`http://localhost:5000/api/v2/businesses/undefined`).reply(400,
        {
            Message: "Business with this ID not found",
            Status: "Fail"
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
    it('it matches snapshot', () => {
        const wrapper = shallow(<EditBusiness/>)
        expect(wrapper.find(EditBusiness)).toMatchSnapshot();
    })
    
    it("Test it renders correctly", ()=>{
        expect(wrapper).toHaveLength(1)
        const component = wrapper.find(EditBusiness)
        expect(component).toHaveLength(1)

    });

    it('Should have a heading',()=>{
        const component = wrapper.find(EditBusiness)
        expect(component.find('h1#heading').text()).toContain("Edit Business")
    })
     
    it('Should have a register button',()=>{
        expect(wrapper.find('button.btn').text()).toContain("Save Changes")
    })
   
    it('check it changes state and value on input change', ()=> {
        const component = wrapper.find(EditBusiness)
        let businessName = component.find('input[name="businessName"]')
        businessName.simulate('change', {target: {name: "businessName",value: 'Supercom Limited'}});
        
        // wrapper.find('form')
        let businessLocation = component.find('input[name="businessLocation"]')
        businessLocation.simulate('change', {target: {name: "businessLocation",value: 'Kampala'}});

        let businessEmail = component.find('input[name="businessEmail"]')
        businessEmail.simulate('change', {target: {name: "businessEmail",value: 'supercom@gmail.com'}});
       
        let contactNumber = component.find('input[name="contactNumber"]')
        contactNumber.simulate('change', {target: {name: "contactNumber",value: '256781712927'}});

        let businessDescription = component.find('textarea[name="businessDescription"]')
        businessDescription.simulate('change', {target: {name: "businessDescription", value: 'This business provides the best services'}});

       
        let businessCategory = wrapper.find('select[name="businessCategory"]')
        businessCategory.simulate('change', {target: {name: "businessCategory", value: 'Entertainment'}});
       
        expect(businessName.instance().value).toBe('Supercom Limited');  
        expect(businessLocation.instance().value).toBe('Kampala');
        expect(businessEmail.instance().value).toBe('supercom@gmail.com');
        expect(contactNumber.instance().value).toBe('256781712927');
        expect(businessDescription.instance().value).toBe('This business provides the best services');
        expect(businessCategory.instance().value).toBe('Entertainment');
    });

    it('It handles errors on submit', async ()=>{
        const component = wrapper.find(EditBusiness)
        let store = {};
        window.localStorage = {
                getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
                setItem: (key, value)=> { store[key] = value},
                removeItem: key => Reflect.deleteProperty(store, key)
        }
        let businessName = component.find('input[name="businessName"]')
        businessName.simulate('change', {target: {name: "businessName",value: 'Supercom Limited'}});
        // wrapper.find('form')
        
        const form = wrapper.find('form')
        await form.simulate('submit',  { preventDefault: ()=>{}})
        
    });
    it('It handles submit', async ()=>{
        const component = shallow(<MemoryRouter><EditBusiness/></MemoryRouter>)
        const EditBusinessComponent = component.find(EditBusiness).dive()
        // console.log(EditBusinessComponent.props())
        let store = {};
        window.localStorage = {
                getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
                setItem: (key, value)=> { store[key] = value},
                removeItem: key => Reflect.deleteProperty(store, key)
        }
        let businessName = EditBusinessComponent.find('input[name="businessName"]')
        // businessName.simulate('change', {target: {name: "businessName",value: 'Supercom Limited'}});
        const form = wrapper.find('form')
        await form.simulate('submit',  { preventDefault: ()=>{}})
        
    });
   
   
});