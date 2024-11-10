import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NavbarWithSearch from "./Components/NavBar/Navbar";
import Product from "./Pages/Product";
import SearchPage from "./Pages/Search";
import CartPage from "./Pages/Cart";
import WishListPage from "./Pages/Wishlist";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";
import { Checkout } from "./Pages/Checkout";
import RegisterPage from "./Pages/Register";
import React from "react";
import { AuthProvider } from "./Context/User.context";

const App = () => {
  return (
    <React.Fragment>
      <AuthProvider>
        <BrowserRouter>
          <NavbarWithSearch />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;
