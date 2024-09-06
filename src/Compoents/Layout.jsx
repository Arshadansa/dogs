import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render child routes
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="">
      <main className="">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
