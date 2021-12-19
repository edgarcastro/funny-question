import React from 'react';
import { NavLink } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <div>
    <h2>Funny Question</h2>
    <NavLink to="/create">Create</NavLink>
  </div>
);
