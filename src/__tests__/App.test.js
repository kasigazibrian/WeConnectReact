import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, mount } from 'enzyme';
import NavigationBar from '../components/home/NavigationBar'
import HomeCarousel from '../components/home/Carousel'
import HomeJumbotron from '../components/home/Jumbotron'
// import { shallowToJson } from 'enzyme-to-json'

 describe('App Component', ()=>{
     const wrapper = shallow(<App/>);


    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Should load corectly', ()=>{
      const wrapper = mount(<App/>)
      expect (wrapper.find(NavigationBar)).toHaveLength(1)
      expect (wrapper.find(HomeCarousel)).toHaveLength(1)
      expect (wrapper.find(HomeJumbotron)).toHaveLength(1)
    })

    it('Should return the isAuthenticated state',  ()=>{
      const wrapper = mount(<App/>)
      let spyGetAuth = jest.spyOn(wrapper.instance(), 'getAuth')
      wrapper.setState({isAuthenticated: true})
      expect(wrapper.instance().getAuth()).toBe(true)
      expect(spyGetAuth).toHaveBeenCalled()
    })

    it('Should set the isAuthenticated state',  ()=>{
      const wrapper = mount(<App/>)
      let spySetAuth = jest.spyOn(wrapper.instance(), 'setAuth')
      wrapper.setState({isAuthenticated: false})
      wrapper.instance().setAuth()
      expect(spySetAuth).toHaveBeenCalled()
      expect(wrapper.state("isAuthenticated")).toBe(true)
    })
    it('Should unset the isAuthenticated state',  ()=>{
      const wrapper = mount(<App/>)
      let spyUnsetAuth = jest.spyOn(wrapper.instance(), 'unsetAuth')
      wrapper.setState({isAuthenticated: true})
      wrapper.instance().unsetAuth()
      expect(spyUnsetAuth).toHaveBeenCalled()
      expect(wrapper.state("isAuthenticated")).toBe(false)
    })


});