import React from 'react';
import { shallow, mount } from 'enzyme';
import BusinessCatalog from '../components/business/BusinessCatalog';
import NavigationBar from '../components/home/NavigationBar';
import MockAdapter from 'axios-mock-adapter'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import Config from '../App.config'

describe('Business Catalog Component', ()=>{
    const mock = new MockAdapter(axios)
   
   
    it('Should return all businesses', ()=>{
        mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?limit=6&page=1`).reply(200,
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
        const wrapper = mount(<MemoryRouter initialEntries={['/','/businesses']}><BusinessCatalog/></MemoryRouter>);
      
        expect(wrapper).toHaveLength(1)
        expect(wrapper).toBeDefined()
        expect(wrapper.find(NavigationBar)).toHaveLength(1)
        expect(localStorage.getItem).toBeCalledWith('token')
      

    })
     
    it('Should set auth to false if token is available', async ()=>{
        // expect(wrapper.find('button.btn').value()).toContain("Signup")
        const wrapper =  await shallow(<MemoryRouter initialEntries={['/','/businesses']}><BusinessCatalog/></MemoryRouter>);
        let store = {};
        window.localStorage = {
        getItem: key => {return null},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
         
     }
        const component = wrapper.find(BusinessCatalog).dive()
        expect(component.state('isAuthenticated')).toBe(false)
      
        

    })

    it('Should set state when it recieves businesses', ()=>{
    mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?limit=6&page=1`).reply(200,
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
     let store = {};
     window.localStorage = {
         getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
         setItem: (key, value)=> { store[key] = value},
         removeItem: key => Reflect.deleteProperty(store, key)
         
     }
     const wrapper =  shallow(<MemoryRouter initialEntries={['/','/businesses']}><BusinessCatalog/></MemoryRouter>);
     const component = wrapper.find(BusinessCatalog).dive()
     expect(component.state('isAuthenticated')).toBe(true)
   
    })

     it('Should return total count of businesses', ()=>{
      const wrapper = shallow(<MemoryRouter initialEntries={['/','/businesses']}><BusinessCatalog/></MemoryRouter>);
      const component = wrapper.find(BusinessCatalog).dive()
      jest.spyOn(component.instance(), 'componentDidMount')
      expect(component.instance().showTotal('dfg')).toBe('Total dfg Businesses')
       
     })
     
     it('Should go to next page', async ()=>{
      let store = {};
      window.localStorage = {
          getItem: key =>{return {"Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiZXhwIjoxNTI5Njg1NTc3fQ.WJ2_sTwagTSBJ73iuBogIMVA6M8752ZUlCPOORNuWCI"}},
          setItem: (key, value)=> { store[key] = value},
          removeItem: key => Reflect.deleteProperty(store, key)
          
      }
      mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?limit=2&page=1`).reply(200,
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
       const businesses =[{
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
      const wrapper = shallow(<MemoryRouter initialEntries={['/','/businesses']}><BusinessCatalog/></MemoryRouter>);
      const component = wrapper.find(BusinessCatalog).dive()
      
      component.setState({businesses: businesses}, (businesses)=>{

      })
        await component.instance().onChange(1, 2)
        expect(component.state('businesses'))    
     })

     it('Should catch a bad request', ()=>{
      mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?limit=6&page=1`).reply(400, {Message: "Please ensure the limit is an integer"})
      const wrapper = mount(<BusinessCatalog/>);
      let spyComponentDidMount = jest.spyOn(wrapper.instance(), 'componentDidMount')
      let spyOnchange= jest.spyOn(wrapper.instance(), 'onChange')
      wrapper.instance().componentDidMount()
      wrapper.instance().onChange(1, 6)
      expect(spyOnchange).toHaveBeenCalled()
      expect (spyComponentDidMount).toHaveBeenCalled()

     })
     it('Should catch a server error', ()=>{
      mock.onGet(`${Config.API_BASE_URL}/api/v2/businesses?limit=6&page=1`).networkError()
      const wrapper = mount(<BusinessCatalog/>);
      let spyComponentDidMount = jest.spyOn(wrapper.instance(), 'componentDidMount')
      let spyOnchange= jest.spyOn(wrapper.instance(), 'onChange')
      wrapper.instance().componentDidMount()
      wrapper.instance().onChange(1, 6)
      expect(spyOnchange).toHaveBeenCalled()
      expect (spyComponentDidMount).toHaveBeenCalled()
     })


   
});