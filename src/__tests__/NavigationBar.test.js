import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from '../components/home/NavigationBar';

describe('Navigation Bar component',()=>{
  const wrapper = shallow(<NavigationBar/>)

  it('should render correctly',()=>{
      expect(wrapper.length).toBe(1)
  })

  it('should toggle menu when window size reduces', ()=>{
    expect(wrapper.state("isOpen")).toBe(false)
    wrapper.instance().toggle()
    expect(wrapper.state("isOpen")).toBe(true)
  })
})