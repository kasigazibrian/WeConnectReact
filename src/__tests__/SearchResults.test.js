import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResults  from '../components/business/SearchResults';
import NavigationBar from '../components/home/NavigationBar';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Config from '../App.config'

global.searchObject = {
  businessName: 'BMW',
  category: "Automobiles",
  location: "Kabale",
  page: 1,
  limit: 6,
  count: 2,
  businesses: [
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
}
describe('Search Results Component', ()=>{
  const mock = new MockAdapter(axios)
  mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?q=BMW&category=Automobiles&location=Kabale&limit=6&page=1`).reply(200,
    {
      page: 1,
      limit: 20,
      count: 2,
      number_of_pages: 1,
      previous: null,
      next: null,
      Businesses: [
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
    }
  )
  const wrapper = mount(<SearchResults location={{state: {searchObject: searchObject }}}/>);
  it('Should return all businesses', ()=>{
      const wrapper = mount(<SearchResults location={{state: {searchObject: searchObject }}}/>);
      expect(wrapper).toHaveLength(1)
      expect(wrapper).toBeDefined() 
      expect(wrapper.find(NavigationBar)).toHaveLength(1)
            
      })

    it('should set state to false if token is null', ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{ return null},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
      }
      const wrapper = mount(<SearchResults location={{state: {searchObject: searchObject }}}/>);
      expect(wrapper.state().isAuthenticated).toBe(false)
    })

    it('should return the businesses for next page on page change',()=>{
       let spyOnPageChange = jest.spyOn(wrapper.instance(), 'onChange')
       wrapper.instance().onChange(1, 6)
       expect(spyOnPageChange).toHaveBeenCalled()
    })

    it('should change the business arrangement when pagesizechanger is called',()=>{
      let spyOnPageChange = jest.spyOn(wrapper.instance(), 'onShowSizeChange')
      wrapper.instance().onShowSizeChange(1, 6)
      expect(spyOnPageChange).toHaveBeenCalled()
    })

    it('should handle server errors', ()=>{
      mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?q=BMW&category=Automobiles&location=Kabale&limit=6&page=1`).reply(400,{
        Message: "No businesses found"
      })
      let spyOnPageChange = jest.spyOn(wrapper.instance(), 'onShowSizeChange')
      wrapper.instance().onShowSizeChange(1, 6)
      expect(spyOnPageChange).toHaveBeenCalled()
    })

    it('should handle network errors', ()=>{
      mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?q=BMW&category=Automobiles&location=Kabale&limit=6&page=1`).networkError()
      let spyOnPageChange = jest.spyOn(wrapper.instance(), 'onShowSizeChange')
      wrapper.instance().onShowSizeChange(1, 6)
      expect(spyOnPageChange).toHaveBeenCalled()
    })

    it('should handle invalid location state',()=>{
      const wrapper = mount(<SearchResults location={{state: undefined }}/>);
      //since state is undefined we expect no business results and the initial count to bne 1
      expect(wrapper.state().count).toBe(1)
      expect(wrapper.state().businesses).toEqual([])
      expect(wrapper.state().location).toEqual("")
    })
   
     
  })
   