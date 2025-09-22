import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Product from "../Product/Product";
import Products from "../Products/Products";
import Footer from "../Footer/Footer";
import { ProductS } from "../Products/Productss";
import Checkout from "../Checkout/Checkout";
import Address from "../Address/Address";
import Cart from "../Cart/Cart";
import Payment from "../Payment/Payment";
import Summary from "../Summary/Summary";
import Login from "../Profile/Login";
import Profile from "../Profile/Profile";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products/:type" element={<Products />} />
        <Route path="/products/:type/:subtype" element={<ProductS />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout/cart"
          element={
            <>
              <Checkout />
              <Cart />
            </>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <>
              <Checkout />
              <Address />
            </>
          }
        />
        <Route
          path="/checkout/payment"
          element={
            <>
              <Checkout />
              <Payment />
            </>
          }
        />
        <Route
          path="/checkout/summary"
          element={
            <>
              <Checkout />
              <Summary />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
