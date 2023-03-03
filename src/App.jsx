import React, {Fragment} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {PrimaryRoutes} from 'dataset/routes';
import ThemeProvider from 'theme/ThemeProvider';
import Navbar from 'components/Navbar';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {PrimaryRoutes.map((route, index) => (
              <Fragment key={index}>
                <Route path={route.path} element={route.element}>
                  {route.children && (
                    <Route
                      path={route.children.path}
                      element={route.children.element}
                    />
                  )}
                </Route>
              </Fragment>
            ))}
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
