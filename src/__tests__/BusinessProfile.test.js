import React from 'react';
import { shallow, mount } from 'enzyme';
import BusinessProfile from "../components/business/BusinessProfile";
import axios from 'axios'
import { MemoryRouter }    from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Config from '../App.config'
const mock = new MockAdapter(axios)
global.match = {path: '/', url: "/edit_business/:business_id", params: {business_id: 1}, isExact: true }
describe('Business Profile Component', ()=>{
    
    mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).reply(201,
    {
      "Business Reviews": [
        {
          date_created: "2018-06-30 21:02:28",
          business_id: 2,
          review: "<p>I got my first car from these guys. They are great</p>"
        },
        {
          date_created: "2018-06-30 21:03:06",
          business_id: 2,
          review: "<p>Their work is very goood and it is the best</p>"
        },
        {
          date_created: "2018-06-30 21:04:32",
          business_id: 2,
          review: "<p>Most people in our country use these cars. In my own opinion i think they are the best</p>"
        }
      ],
      Status: "Success"
    }
    )
    mock.onDelete(`${Config.API_BASE_URL}/api/v2/businesses/1`).reply(200,{
    Message: "Business has been deleted successfully",
    Status: "Success"
    })
    mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).reply(201, {
      Message: "Review has been added successfully",
      Status: "Success"
    })
    mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses/2`).reply(200,
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
         }],
         Status: "Success"
        })
   
    it("Test it mounts correctly", ()=>{
        const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const component =  wrapper.find(BusinessProfile).dive()
        expect(component).toHaveLength(1)

    });


    it("has the heading", ()=>{
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      expect(Component.find('h1#profile-heading').text()).toContain("Business Profile")
    })
      it("has the add review heading", ()=>{
        const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const Component = wrapper.find(BusinessProfile).dive()
        expect(Component.find('h3').text()).toContain("Add Business Review:")
    })
    it("has the Business reviews heading", ()=>{
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      expect(Component.find('h4').text()).toContain(" Business Reviews:")
    })
  
    it('check it changes state on change of review content', ()=>{
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      
      let review = Component.find('#content')
      review.simulate('change', {target: {name: "password",value: 'mango', getContent: ()=>{return(<p>this is my review</p>)}}})
      
      expect(Component.state('review').props.children).toBe('this is my review');  
    });

    it('check it sets auth to false when no token is provided', ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{ return null},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
          
      }
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      expect(Component.state('isAuthenticated')).toBe(false);  
    });

    it('check it sets auth to true when token is provided', ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{ return {"Token": "usertoken"}},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
          
      }
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      expect(Component.state('isAuthenticated')).toBe(true);  
    });

    it('Submits the review form', async ()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const Component = wrapper.find(BusinessProfile).dive()
      
        let review = Component.find('#content')
        review.simulate('change', {target: {name: "password",value: 'mango', getContent: ()=>{return(<p>this is my review</p>)}}})
        let spyOnSubmit = jest.spyOn(Component.instance(), 'handleSubmit')
        let form = Component.find('form')
        form.simulate('submit', {preventDefault: ()=>{}})
        
    })

    it('Should return the right permission', ()=>{
      let store = {};
        window.localStorage = {
        getItem: key =>{return {"id": "1"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const Component = wrapper.find(BusinessProfile).dive()
        let businessOwnerId = 1
        // handleAddReviewPermissions
        expect(Component.instance().handleAddReviewPermissions(businessOwnerId)).toEqual("show")
        expect(Component.instance().handleCreateEditPermissions(businessOwnerId)).toEqual("collapse")
    })
    it("Should handle delete", ()=>{
      let store = {};
      window.localStorage = {
      getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
      setItem: (key, value)=> { store[key] = value},
      removeItem: key => Reflect.deleteProperty(store, key)
      } 
      const wrapper = shallow(<MemoryRouter initialEntries={["/businesses/:business_id"]}><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const Component = wrapper.find(BusinessProfile).dive()
      let button = Component.find("#delete_business")
      button.simulate('click',{preventDefault: ()=>{}})
    })
    it('sets state to false if token is null', ()=>{
      let store = {};
      window.localStorage = {
        getItem: key =>{ return null},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        
      }
      const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>)
      let registerComponent = wrapper.find(BusinessProfile).dive()
      expect(registerComponent.state('isAuthenticated')).toBe(false);  
       
    })
    it('should handle bad request errors',()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).reply(400,
        {
          Message: "No review has been added"
        })
        mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).reply(400,{
         Message: "No business reviews found"
        })
        mock.onDelete(`${Config.API_BASE_URL}/api/v2/businesses/1`).reply(401,{
          Message: "Not enough priviledges to delete this business",
          Status: "Failure"
          })
        const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const businessProfileComponent = wrapper.find(BusinessProfile).dive()
        let spyOnHandleSubmit = jest.spyOn(businessProfileComponent.instance(), 'handleDelete') 
        businessProfileComponent.instance().handleDelete( { preventDefault: ()=>{}})
        const form = businessProfileComponent.find('form')
        form.simulate('submit',  { preventDefault: ()=>{}})
        expect(spyOnHandleSubmit).toHaveBeenCalled()
      
    })
      it('should handle server errors',()=>{
        let store = {};
        window.localStorage = {
        getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        }
        mock.onPost(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).networkError()
        mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses/1/reviews`).networkError()
        mock.onDelete(`${Config.API_BASE_URL}/api/v2/businesses/1`).networkError()
        const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
        const businessProfileComponent = wrapper.find(BusinessProfile).dive()
        let spyOnHandleSubmit = jest.spyOn(businessProfileComponent.instance(), 'handleDelete') 
        businessProfileComponent.instance().handleDelete( { preventDefault: ()=>{}})
        const form = businessProfileComponent.find('form')
        form.simulate('submit',  { preventDefault: ()=>{}})
        expect(spyOnHandleSubmit).toHaveBeenCalled()
      
    })
    it('should set state with reviews', ()=>{
      let store = {};
      window.localStorage = {
      getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
      setItem: (key, value)=> { store[key] = value},
      removeItem: key => Reflect.deleteProperty(store, key)
      }
      const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const businessProfileComponent = wrapper.find(BusinessProfile).dive()
      let spyOnGetReviews = jest.spyOn(businessProfileComponent.instance(), 'getReviews') 
      businessProfileComponent.instance().getReviews()
      expect(spyOnGetReviews).toHaveBeenCalled()
    })

    it('should show the modal on button click', async ()=>{
      let store = {};
      window.localStorage = {
      getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
      setItem: (key, value)=> { store[key] = value},
      removeItem: key => Reflect.deleteProperty(store, key)
      }
      const wrapper = shallow(<MemoryRouter><BusinessProfile match={{params: {business_id: 1}}}/></MemoryRouter>);
      const businessProfileComponent = wrapper.find(BusinessProfile).dive()
      let Button = businessProfileComponent.find(".btn-danger")
      await Button.simulate('click')
      expect(businessProfileComponent.state('modal')).toBe(true)
    })
   
});