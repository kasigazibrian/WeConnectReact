import React from 'react';
import { shallow, mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import SearchPage from '../components/business/searchpage';

global.getAuth = ()=>{
  return false
}
describe('Business Search page Component', ()=>{
    const mock = new MockAdapter(axios)
    const wrapper = mount(<SearchPage getAuth={getAuth}/>)
      mock.onGet(`http://localhost:5000/api/v2/businesses?q=BMW&category=Automobiles&location=Kabale`).reply(200,
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
  it("Test it renders correctly", ()=>{
      expect(wrapper).toHaveLength(1)
      const component = wrapper.find(SearchPage)
      expect(component).toHaveLength(1)

  });

  it('Should have a heading',()=>{
      const component = wrapper.find(SearchPage)
      expect(component.find('a.text-light.navbar-brand').text()).toContain("Search for Businesses")
  })
   
  it('Should have a register button',()=>{
      expect(wrapper.find('button.btn').text()).toContain("Search")
  })

  it('check it changes state on input change', ()=>{
    let category = wrapper.find('select[name="category"]')
    category.simulate('change', {target: {name: "category",value: 'Automobiles'}});
    let location = wrapper.find('select[name="location"]')
    location.simulate('change', {target: {name: "location",value: 'Kabale'}});

    let name = wrapper.find('input[name="business_name"]')
    name.simulate('change', {target: {name: "business_name",value: 'BMW'}});
    expect(wrapper.state('location')).toBe('Kabale');  
    expect(wrapper.state('category')).toBe('Automobiles');
    expect(wrapper.state('business_name')).toBe('BMW');
   });

   it('Should catch any errors returned', ()=>{
      mock.onGet(`http://localhost:5000/api/v2/businesses?q=&category=&location=`).reply(400,{
        Message: "No businesses were obtained"}
    )
    const wrapper = mount(<SearchPage getAuth={getAuth}/>)
    let form = wrapper.find('form')
    form.simulate('submit')
   })

   it('Should return error if server is not running', ()=>{
      mock.onGet(`http://localhost:5000/api/v2/businesses?q=&category=&location=`).networkError()
      const wrapper = mount(<SearchPage getAuth={getAuth}/>)
      let form = wrapper.find('form')
      form.simulate('submit')
   })

  it('Should handle submit',()=>{
      const wrapper = shallow(<MemoryRouter><SearchPage getAuth={getAuth}/></MemoryRouter>)
      const component = wrapper.find(SearchPage).dive()
        component.setState({location: "Kabale", category: "Automobiles", business_name: "BMW"}, ()=>{
        let form = component.find('form')
        form.simulate('submit',{preventDefault: ()=>{}})

      })

    })

    it('check it sets auth to false state when no token is provided', ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{ return null},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
          
      }
      const wrapper = mount(<SearchPage getAuth={getAuth}/>)
      expect(wrapper.state('isAuthenticated')).toBe(false);  
    });

    it('check it sets auth to true state when token is provided', ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{ return {"Token": "usertoken"}},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
          
      }
      const wrapper = mount(<SearchPage getAuth={getAuth}/>)
      expect(wrapper.state('isAuthenticated')).toBe(true);  
    });
    
    it('Toggle function for the search bar should function',()=>{
       wrapper.instance().toggle()
       expect(wrapper.state('isOpen')).toBe(true)
    })

    
});