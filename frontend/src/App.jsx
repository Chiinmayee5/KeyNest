import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* Password Manager */}
       
  <Route path="/" element={<Home />} />
   <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <>
        <Navbar />
        <Manager />
        <Footer />
      </>
    </ProtectedRoute>
  }
/>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;