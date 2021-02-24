import React from 'react';
import { NavLink } from 'react-router-dom';

function SideNav() {
  return (
    <div className='SideNav'>
      <NavLink
        to='/'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Home</h3></div></NavLink>
      <NavLink
        to='/bestsellers'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Bestsellers</h3></div></NavLink>
      <NavLink
        to='/clubs'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Clubs</h3></div></NavLink>
    </div>
  );
}

export default SideNav;