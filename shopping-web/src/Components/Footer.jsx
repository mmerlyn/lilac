import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1  bg-gray-800 text-slate-300 p-5">
      <div>
        <label className="font-medium">ABOUT</label>
        <ul>
          <li>
            <a href="/">Contact Us</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/">Careers</a>
          </li>
        </ul>
      </div>
      <div>
        <label className="font-medium">HELP</label>
        <ul>
          <li>
            <a href="/">Payments</a>
          </li>
          <li>
            <a href="/">Shipping</a>
          </li>
          <li>
            <a href="/">Cancellation & Returns</a>
          </li>
        </ul>
      </div>
      <div>
        <label className="font-medium">MAIL US:</label>
        <ul>
          <li>merlynmercylona@gmail.com</li>
        </ul>
      </div>
      <div>
        <label className="font-medium">Registered Office Address:</label>
        <ul>
          <li>30, Kalash Ladies PG</li>
          <li>Sharadha Nagar, Udaya Layout</li>
          <li>Yelahanka New Town</li>
          <li>Bengaluru-560065</li>
          <li>Karnataka, INDIA</li>
          <li>Ph.No: 7619181347</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
