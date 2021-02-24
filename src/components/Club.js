import React from 'react';
import Avatar from './Avatar';
import { NavLink } from 'react-router-dom';

const Club = ({id, avatar, name, description}) => 
  <NavLink to={`/clubs/${id}`} exact className='Navlink'>
    <div className='Club'>
      <Avatar avatar={avatar} showing={name} />
      <div className='content'>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  </NavLink>;

export default Club;