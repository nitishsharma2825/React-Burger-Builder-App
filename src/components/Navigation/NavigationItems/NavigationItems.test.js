import React from 'react'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

describe('<NavigationItems />',()=>{
    let wrapper=shallow(<NavigationItems />)

    it('should have 2 <NavigationItem /> if not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should have 3 <NavigationItem /> if authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should contains <NavigationItem link="/logout" /> if authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
}
)