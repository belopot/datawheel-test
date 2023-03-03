import React from 'react';
import Search from 'pages/Search';
import Country from 'pages/Country';
import Chart from 'pages/Country/Chart';

export const PrimaryRoutes = [
  {
    path: '/',
    title: 'Search',
    element: <Search />,
    children: null,
  },
  {
    path: '/country',
    title: 'Country',
    element: <Country />,
    children: {
      path: ':countryId',
      title: 'Chart',
      element: <Chart />,
    },
  },
];
