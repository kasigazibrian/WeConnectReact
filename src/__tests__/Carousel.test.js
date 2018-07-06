import React from 'react';
import { shallow, mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import spy from 'sinon'
import HomeCarousel from '../components/home/Carousel';
import HomeJumbotron from '../components/home/Jumbotron';
import NavigationBar from '../components/home/NavigationBar';

global.getAuth = ()=>{
  return false
}

describe('Business Search page Component', ()=>{

  const wrapper = mount(<HomeCarousel getAuth={getAuth}/>)
  it("Test it renders correctly", ()=>{
    expect(wrapper.find(HomeCarousel)).toHaveLength(1)
    expect(wrapper.find(HomeJumbotron)).toHaveLength(1)
    expect(wrapper.find(NavigationBar)).toHaveLength(1)
});
   it('Should call next function on click',()=>{
    const instance = wrapper.instance()
    const spyNext = jest.spyOn(instance, 'next');
    wrapper.instance().onExited()
    wrapper.instance().next()
    let nextItem = wrapper.find('a.carousel-control-next')
    nextItem.simulate('click')
    expect(spyNext).toHaveBeenCalled();

       
   })

   it('Should go to index', ()=>{
    const instance = wrapper.instance()
    const spyGoToIndex = jest.spyOn(instance, 'goToIndex');
    wrapper.instance().onExited()
    wrapper.instance().goToIndex(2)
    expect(spyGoToIndex).toHaveBeenCalled();
   })

   it('Should call previous function on click',()=>{
    const instance = wrapper.instance()
    const spyPrev = jest.spyOn(instance, 'previous');
    wrapper.instance().onExited()
    wrapper.instance().previous()
    let previous = wrapper.find('a.carousel-control-prev')
    previous.simulate('click')
    expect(spyPrev).toHaveBeenCalled();

       
   })
   it('Should set state with new index',()=>{
    const instance = wrapper.instance()
    const spyGoToIndex = jest.spyOn(instance, 'goToIndex');
    wrapper.instance().onExiting()
    wrapper.instance().goToIndex(1)
    expect(wrapper.state("activeIndex")).toBe(1)
    expect(spyGoToIndex).toHaveBeenCalled();
   })

   it('check it sets auth to false state when no token is provided', ()=>{
    let store = {};
    window.localStorage = {
        getItem: key =>{ return null},
        setItem: (key, value)=> { store[key] = value},
        removeItem: key => Reflect.deleteProperty(store, key)
        
    }
    const wrapper = mount(<HomeCarousel getAuth={getAuth}/>)
    expect(wrapper.state('isAuthenticated')).toBe(false);  
  });
})

