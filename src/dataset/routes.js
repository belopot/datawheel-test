import React from 'react';
import Search from 'pages/Search';
import Country from 'pages/Country';

export const PrimaryRoutes = [
  {
    path: '/',
    title: 'Search',
    component: <Search />,
  },
  {
    path: '/country',
    title: 'Country',
    component: <Country />,
  },
];
