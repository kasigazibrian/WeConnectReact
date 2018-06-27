// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import BusinessCatalog from '../components/business/BusinessCatalog';
// import NavigationBar from '../components/home/NavigationBar';
// import MockAdapter from 'axios-mock-adapter'
// import renderer from 'react-test-renderer'
// import { MemoryRouter } from 'react-router-dom'
// import axios from 'axios'
// import { spy } from 'sinon';
// import { BrowserRouter as Router }    from 'react-router-dom';

// describe('Business Catalog Component', ()=>{
//     const mock = new MockAdapter(axios)
   
   
//     it('Should return all businesses', ()=>{
//         const wrapper = mount(<MemoryRouter><BusinessCatalog/></MemoryRouter>);
//         mock.onGet(`http://localhost:5000/api/v2/businesses?limit=6&page=1`).reply(200,
//              {
//                 page: 1,
//                 limit: 20,
//                 count: 2,
//                 number_of_pages: 1,
//                 previous: null,
//                 next: null,
//                 Businesses: [
//                   {
//                     business_id: 1,
//                     business_owner_id: 1,
//                     business_name: "Mediacom",
//                     business_email: "mediacom@gmail.com",
//                     business_location: "Kampala",
//                     contact_number: "256781712929",
//                     business_category: "Real Estate",
//                     business_description: "This business provides the best video coverage"
//                   },
//                   {
//                     business_id: 3,
//                     business_owner_id: 1,
//                     business_name: "BMW",
//                     business_email: "bmw@gmail.com",
//                     business_location: "Kabale",
//                     contact_number: "256781712926",
//                     business_category: "Automobiles",
//                     business_description: "This business provides the best cars"
//                   }
//                 ],
//                 "Status": "Success"
              
//         })
//         // console.log(wrapper.state())
//          // it("Test it renders correctly", ()=>{
//         // const wrapper = mount(<BusinessCatalog/>);
//         // expect(BusinessCatalog.prototype.componentDidMount.calledOnce).to.equal(true);
//         // console.log(BusinessCatalog.prototype.componentDidMount.notCalled)
//         expect(wrapper).toHaveLength(1)
//         expect(wrapper).toBeDefined()
//         expect(wrapper.find(NavigationBar)).toHaveLength(1)
//         // expect(wrapper.state('is_authenticated')).toEqual(true)
//         expect(localStorage.getItem).toBeCalledWith('token')
//     // });

//     })
     
//     // it('Should have a heading',()=>{
//     //     expect(wrapper.find('button.btn').value()).toContain("Signup")
//     // })

   
// });