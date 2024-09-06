import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render child routes

import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
  
      
      {/* Main content will be rendered here */}
      <main className="flex-grow ">
        <Outlet /> {/* This will render the matched route's component */}
      </main>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
