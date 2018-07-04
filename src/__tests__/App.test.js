import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

// import { shallowToJson } from 'enzyme-to-json'

 describe('App Component', ()=>{
     const wrapper = shallow(<App/>);


    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
});

});