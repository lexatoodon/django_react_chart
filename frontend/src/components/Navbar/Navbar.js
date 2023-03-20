import React from 'react';
import { Outlet } from "react-router-dom";
import './Navbar.css'
function Header () {

  return (
    <section className="navbar">
      <a href="/" className="navbar-item">All</a>
      <a href="/finished" className="navbar-item">Finished Orders</a>
      <a href="/unfinished" className="navbar-item">Unfinished Orders</a>
  </section>
  )
}


const Navbar = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Navbar;