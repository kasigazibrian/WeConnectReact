import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResults  from '../components/business/SearchResults';
import NavigationBar from '../components/home/NavigationBar';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

global.businesses = 
 [
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
    ]
describe('Search Results Component', ()=>{
  const mock = new MockAdapter(axios)
 
 
  it('Should return all businesses', ()=>{
      const wrapper = mount(<SearchResults location={{state: {businesses: businesses }}}/>);
      expect(wrapper).toHaveLength(1)
      expect(wrapper).toBeDefined() 
      expect(wrapper.find(NavigationBar)).toHaveLength(1)
            
      })
     
  })
   