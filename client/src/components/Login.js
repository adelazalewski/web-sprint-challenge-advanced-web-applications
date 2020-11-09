import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username:  "",
    password: ""
  })
  const {push} = useHistory();
  const handleChange = (e) => {
    e.persist();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault();
    setUser({
      username:  "",
      password: ""
    })
    axios.post("http://localhost:5000/api/login", user)
    .then(res =>{
      console.log("login res: ",res);
      localStorage.setItem("token", res.data.payload);
      push("/bubblepage")
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form id="login-form" onSubmit={submit}>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" placeholder="Lambda School" value={user.username} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="i<3Lambd4" value={user.password} onChange={handleChange} />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
