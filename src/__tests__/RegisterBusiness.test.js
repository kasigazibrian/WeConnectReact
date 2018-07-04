import React from 'react';
import { shallow, mount } from 'enzyme';
import RegisterBusiness from "../components/business/RegisterBusiness";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { MemoryRouter }    from 'react-router-dom';
import Config from '../App.config'



describe('Signup Component', ()=>{

	const wrapper = shallow(<MemoryRouter><RegisterBusiness/></MemoryRouter>);
	const mock = new MockAdapter(axios);

	mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses`).reply(201,
		{
			Message: "Business Supercom has been registered successfully",
			Status: "Success"
		})
	
	it("Test it renders correctly", ()=>{
		expect(wrapper.find(RegisterBusiness)).toHaveLength(1)

	});

	it('Should have a heading',()=>{
		const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
		expect(registerBusinessComponent.find('h1').text()).toContain("Business Registration Form")
	})
	 
	it('Should have a register button',()=>{
		const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
		expect(registerBusinessComponent.find('button.btn').text()).toContain("Register")
	})
   
	it('check it changes state on input change', ()=>{
		const registerBusinessComponent = mount(<RegisterBusiness/>)
		let businessName = registerBusinessComponent.find('input[name="business_name"]')
		businessName.simulate('change', {target: {name: "business_name",value: 'Supercom Limited'}});
		// wrapper.find('form')
		let businessLocation = registerBusinessComponent.find('input[name="business_location"]')
		businessLocation.simulate('change', {target: {name: "business_location",value: 'Kampala'}});
		

		let businessEmail = registerBusinessComponent.find('input[name="business_email"]')
		businessEmail.simulate('change', {target: {name: "business_email",value: 'supercom@gmail.com'}});
	   
		let contactNumber = registerBusinessComponent.find('input[name="contact_number"]')
		contactNumber.simulate('change', {target: {name: "contact_number",value: '256781712927'}});
		
		let businessDescription = registerBusinessComponent.find('textarea[name="business_description"]')
		businessDescription.simulate('change', {target: {name: "business_description", value: 'This business provides the best services'}});
		
		let businessCategory = registerBusinessComponent.find('select[name="business_category"]')
		businessCategory.simulate('change', {target: {name: "business_category",value: 'Entertainment'}});
		
		
		expect(registerBusinessComponent.state('business_name')).toBe('Supercom Limited');  
		expect(registerBusinessComponent.state('business_location')).toBe('Kampala');
		expect(registerBusinessComponent.state('business_email')).toBe('supercom@gmail.com');
		expect(registerBusinessComponent.state('contact_number')).toBe('256781712927');
		expect(registerBusinessComponent.state('business_description')).toBe('This business provides the best services');
		expect(registerBusinessComponent.state('business_category')).toBe('Entertainment');
	});

	it('It handles submit', async ()=>{
		let store = {};
		window.localStorage = {
		getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
		setItem: (key, value)=> { store[key] = value},
		removeItem: key => Reflect.deleteProperty(store, key)
    }
		const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
		let businessName = registerBusinessComponent.find('input[name="business_name"]')
		businessName.simulate('change', {target: {name: "business_name",value: 'Supercom Limited'}});
		// wrapper.find('form')
		let businessLocation = registerBusinessComponent.find('input[name="business_location"]')
		businessLocation.simulate('change', {target: {name: "business_location",value: 'Kampala'}});
		

		let businessEmail = registerBusinessComponent.find('input[name="business_email"]')
		businessEmail.simulate('change', {target: {name: "business_email",value: 'supercom@gmail.com'}});
	   
		let contactNumber = registerBusinessComponent.find('input[name="contact_number"]')
		contactNumber.simulate('change', {target: {name: "contact_number",value: '256781712927'}});
		
		let businessDescription = registerBusinessComponent.find('#business_description')
		businessDescription.simulate('change', {target: {name: "business_description", value: 'This business provides the best services'}});
		
		let businessCategory = registerBusinessComponent.find('#businessCategory')
		businessCategory.simulate('change', {target: {name: "business_category",value: 'Entertainment'}});
		const form = registerBusinessComponent.find('form')
		await form.simulate('submit',  { preventDefault: ()=>{}})
		
	});
	it('sets state to false if token is null', ()=>{
		let store = {};
		window.localStorage = {
			getItem: key =>{ return null},
			setItem: (key, value)=> { store[key] = value},
			removeItem: key => Reflect.deleteProperty(store, key)
			
		}
		const wrapper = shallow(<MemoryRouter><RegisterBusiness/></MemoryRouter>)
		let registerComponent = wrapper.find(RegisterBusiness).dive()
		expect(registerComponent.state('isAuthenticated')).toBe(false);  
	   
	})
	it('should handle bad request errors',()=>{
			let store = {};
			window.localStorage = {
			getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
			setItem: (key, value)=> { store[key] = value},
			removeItem: key => Reflect.deleteProperty(store, key)
			}
		mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses`).reply(400,
			{
				Message: "Business with this name already exists",
				Status: "Fail"
			})
			const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
			let spyOnHandleSubmit = jest.spyOn(registerBusinessComponent.instance(), 'handleSubmit') 
			const form = registerBusinessComponent.find('form')
			form.simulate('submit',  { preventDefault: ()=>{}})
		
	})
		it('should handle server errors',()=>{
			let store = {};
			window.localStorage = {
			getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
			setItem: (key, value)=> { store[key] = value},
			removeItem: key => Reflect.deleteProperty(store, key)
			}
			mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses`).networkError()
			const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
			let spyOnHandleSubmit = jest.spyOn(registerBusinessComponent.instance(), 'handleSubmit') 
			const form = registerBusinessComponent.find('form')
			form.simulate('submit',  { preventDefault: ()=>{}})
		
	})
	
	

});