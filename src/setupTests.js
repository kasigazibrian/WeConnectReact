import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// browser mocks
const localStorageMock = ( ()=> {
    let store = {};
    return {
        getItem: (key)=> {
            return store[key] || null
        },
        setItem: (key, value)=> {
            store[key] = value.toString()
        },
        removeItem: (key)=> delete store[key],
        clear: ()=> store = {}
        ,
    }
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});