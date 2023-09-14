import React, { useState, useRef } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const inputRefUsername = useRef(null);
  const inputRefPassword = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const dataPost = {
      username: inputRefUsername.current.value,
      password: inputRefPassword.current.value,
    };
    // Make a POST request to your API endpoint for authentication
    axios
      .post("http://localhost:8080/api/v1/auth/login-jwt", dataPost)
      .then((response) => {
        // Handle successful login (e.g., store user token in local storage, redirect, etc.)
        console.log("Login successful");
        console.log(response.data); // You may receive a token or user data from your API
        const data = response.data;
        localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        // Handle login error (e.g., display error message)
        console.error("Login failed");
        console.error(error);
      });
  };

  const inputRefFullname = useRef(null);
  const inputRefEmail = useRef(null);
  const inputRefUsernameSU = useRef(null);
  const inputRefPasswordSU = useRef(null);
  const inputRefAvatar = useRef(null);
  const inputRefBirthday = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const dataPost = {
      fullname: inputRefFullname.current.value,
      email: inputRefEmail.current.value,
      username: inputRefUsernameSU.current.value,
      password: inputRefPasswordSU.current.value,
      avatar: inputRefAvatar.current.value,
      dateOfBirth: inputRefBirthday.current.value
    }
    await axios.post("http://localhost:8080/api/v1/account/create", dataPost)
    .then(navigate("/login"))
    .catch((error) => {
      // Handle login error (e.g., display error message)
      console.error("Login failed");
      console.error(error);
    });
  }
  return (
    <>
      <div className="container">
        <div className="tabs">
          <button onClick={toggleForm} className="text-white btn m-5">{isLogin ? "Signup" : "Login"}</button>
        </div>
        {isLogin ? (
          <form onSubmit={(e) => handleLogin(e)} className="box">
            <h1 className="text-white m-5">Log In</h1>
            <div>
              <label htmlFor="username" className="text-white m-5">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                ref={inputRefUsername}
                className="m-5"
               
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white m-5">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                ref={inputRefPassword}
                className="m-5"
            
              />
            </div>
            <button type="submit" className="btn m-5">Login</button>
          </form>
        ) : (
          <form onSubmit={(e) => handleSignUp(e)} className="box">
            <h1 className="text-white m-5">Sign Up For Free</h1>
            <div>
              <label htmlFor="fulname" className="text-white m-5">Fullname:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                ref={inputRefFullname}
                className="m-5"
               
              />
            </div>
            <div>
              <label htmlFor="username" className="text-white m-5">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={inputRefEmail}
                className="m-5"
               
              />
            </div>
            <div>
              <label htmlFor="username-su" className="text-white m-5">Username:</label>
              <input
                type="text"
                id="username-su"
                name="username-su"
                ref={inputRefUsernameSU}
                className="m-5"
               
              />
            </div>
            <div>
              <label htmlFor="password-su" className="text-white m-5">Password:</label>
              <input
                type="password"
                id="password-su"
                name="password-su"
                ref={inputRefPasswordSU}
                className="m-5"
            
              />
            </div>
            <div>
              <label htmlFor="avatar" className="text-white m-5">Avatar:</label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                ref={inputRefAvatar}
                className="m-5"
               
              />
            </div>
            <div>
              <label htmlFor="birthday" className="text-white m-5">Birthday:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                ref={inputRefBirthday}
                className="m-5"
               
              />
            </div>
            <button type="submit" className="btn m-5">Sign Up</button>
          </form>
        )}
      </div>
    </>
  );
}
export default Login;
