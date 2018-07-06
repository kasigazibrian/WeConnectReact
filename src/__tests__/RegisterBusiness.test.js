import React from 'react';
import { shallow, mount } from 'enzyme';
import RegisterBusiness from "../components/business/RegisterBusiness";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { MemoryRouter }    from 'react-router-dom';
import Config from '../App.config'
import BusinessRegistration from '../components/business/RegisterBusiness';



describe('Register Business Component', ()=>{

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
		let businessName = registerBusinessComponent.find('input[name="businessName"]')
		businessName.simulate('change', {target: {name: "businessName",value: 'Supercom Limited'}});
		// wrapper.find('form')
		let businessLocation = registerBusinessComponent.find('input[name="businessLocation"]')
		businessLocation.simulate('change', {target: {name: "businessLocation",value: 'Kampala'}});
		

		let businessEmail = registerBusinessComponent.find('input[name="businessEmail"]')
		businessEmail.simulate('change', {target: {name: "businessEmail",value: 'supercom@gmail.com'}});
	   
		let contactNumber = registerBusinessComponent.find('input[name="contactNumber"]')
		contactNumber.simulate('change', {target: {name: "contactNumber",value: '256781712927'}});
		
		let businessDescription = registerBusinessComponent.find('textarea[name="businessDescription"]')
		businessDescription.simulate('change', {target: {name: "businessDescription", value: 'This business provides the best services'}});
		
		let businessCategory = registerBusinessComponent.find('select[name="businessCategory"]')
		businessCategory.simulate('change', {target: {name: "businessCategory",value: 'Entertainment'}});
		
		
		expect(registerBusinessComponent.state('businessName')).toBe('Supercom Limited');  
		expect(registerBusinessComponent.state('businessLocation')).toBe('Kampala');
		expect(registerBusinessComponent.state('businessEmail')).toBe('supercom@gmail.com');
		expect(registerBusinessComponent.state('contactNumber')).toBe('256781712927');
		expect(registerBusinessComponent.state('businessDescription')).toBe('This business provides the best services');
		expect(registerBusinessComponent.state('businessCategory')).toBe('Entertainment');
	});

	it('It handles submit', async ()=>{
		let store = {};
		window.localStorage = {
		getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
		setItem: (key, value)=> { store[key] = value},
		removeItem: key => Reflect.deleteProperty(store, key)
    }
		const registerBusinessComponent = wrapper.find(RegisterBusiness).dive()
		let businessName = registerBusinessComponent.find('input[name="businessName"]')
		businessName.simulate('change', {target: {name: "businessName",value: 'Supercom Limited'}});
		// wrapper.find('form')
		let businessLocation = registerBusinessComponent.find('input[name="businessLocation"]')
		businessLocation.simulate('change', {target: {name: "businessLocation",value: 'Kampala'}});
		

		let businessEmail = registerBusinessComponent.find('input[name="businessEmail"]')
		businessEmail.simulate('change', {target: {name: "businessEmail",value: 'supercom@gmail.com'}});
	   
		let contactNumber = registerBusinessComponent.find('input[name="contactNumber"]')
		contactNumber.simulate('change', {target: {name: "contactNumber",value: '256781712927'}});
		
		let businessDescription = registerBusinessComponent.find('#business_description')
		businessDescription.simulate('change', {target: {name: "businessDescription", value: 'This business provides the best services'}});
		
		let businessCategory = registerBusinessComponent.find('#business_category')
		businessCategory.simulate('change', {target: {name: "businessCategory",value: 'Entertainment'}});
		const form = registerBusinessComponent.find('form')
		await form.simulate('submit',  { preventDefault: ()=>{}})
		expect(registerBusinessComponent.state().businessName).toEqual("Supercom Limited")

		
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
	it('should handle bad request errors', ()=>{
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
			setTimeout(()=>{expect(registerBusinessComponent.state('registeredSuccessfully')).toBe(false)
			expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1)}, 1)
	
		
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
			setTimeout(()=>{expect(registerBusinessComponent.state('registeredSuccessfully')).toBe(false)
			expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1)}, 1)
		
	})
	
	

});