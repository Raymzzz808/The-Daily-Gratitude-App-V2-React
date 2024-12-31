import React, { useState } from "react";

function Login(props) {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserCredentials((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function loginHandler(event) {
    event.preventDefault();
    const user = userCredentials;
    props.checkUser(user);
    setUserCredentials({
      username: "",
      password: "",
    });
  }

  return (
    <div className="loginSection">
      <h2 className="loginHeader"> Login </h2>
      <form className="loginForm" action="submit" onSubmit={loginHandler}>
        <label htmlFor="username" value="username" />
        <input
          className="inputs"
          type="text"
          name="username"
          value={props.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <label htmlFor="password" value="password" />
        <input
          className="inputs"
          type="password"
          name="password"
          value={props.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="formBtn" type="submit">
          Login
        </button>
        <button className="formBtn" style={{ marginTop: "5px" }}>
          <a href="/auth/google" role="button">
            <img
              className="google"
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            />{" "}
            Sign in with Google
          </a>
        </button>
      </form>
      <small className="register">
        Not a user?
        <br />
        Register <span className="registerLink">Here</span>
      </small>
    </div>
  );
}

export default Login;
