import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

import "./Navbar.css";
import { logoutUser } from "../slices/authSlice";

const Navbar = () => {

  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state)=>state.auth)

  return (
    <nav className="nav_bar">
      <Link to="/">
        <h2>
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="30px" 
        height="30px" 
        fill="yellow"
        className="bi bi-house-door" viewBox="0 0 16 16">
        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
        </svg>
          <span style={{ color: "orange", fontSize: "40px" }}>{" "}M</span>obiles{" "}
          <span style={{ color: "orange", fontSize: "40px" }}>S</span>tore
       </h2>
      </Link>
      <Link to="/cart">
        <div className="nav-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentcolor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />{" "}
          </svg>
          <span className="cart-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
{
  auth._id ? (
  <Links>
   {auth.isAdmin || !auth.isAdmin ? (
  <div>
  <Link to="admin/summary">Admin</Link>
  </div>
   ) : null }
   <div onClick={() => {
    dispatch(logoutUser(null));
    
    toast.warning("Logged out!", { position: "bottom-left" });
  }} className="logout">
    <Link to="/">Logout</Link>
  </div>
  </Links>) : (<AuthLinks>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  </AuthLinks>
)}
    </nav>
  );
};

export default Navbar;

const AuthLinks = styled.div`
a{
  &:last-child{
    margin-left: 2rem;
  }
}`

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
