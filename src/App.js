import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";

import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import CartScreen from "./components/screens/CartScreen";
import ProductScreen from "./components/screens/ProductScreen";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductScreen />} />
        <Route exact path="/cart/:id" element={<CartScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/signup" element={<SignupScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}
