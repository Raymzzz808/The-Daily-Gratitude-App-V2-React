import React, { useState } from "react";
import bcrypt from "bcryptjs";

function Register(props) {
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("white");

  //LISTENS TO PW KEYS::
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handlePasswordMatch(event) {
    setPassword2(event.target.value);
  }
  //SUBMIT BUTTON::
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Check Passwords
    if (password === password2) {
      setSuccess("white");
      try {
        const saltRounds = 10; // Adjust this for security vs. performance trade-off
        const hashed = await bcrypt.hash(password, saltRounds);
        // Send the hashedPassword to your backend for storage
        // ...
      } catch (error) {}
    } else {
      setSuccess("red");
      setMessage("PASSWORDS DONT MATCH!");
    }
  };

  return (
    <div className="loginSection">
      <h2 className="loginHeader"> Register </h2>
      <form
        className="loginForm"
        action="/register"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstName" value="firstName" />
        <input
          className="inputs"
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <label htmlFor="lastName" value="lastName" />
        <input
          className="inputs"
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
        />
        <label htmlFor="password" value="username" />
        <input
          className="inputs"
          type="email"
          name="password"
          placeholder="Email"
          required
        />
        <label htmlFor="password" value="password" />
        <input
          className="inputs"
          type="password"
          name="password"
          htmlvalue={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <input
          className="inputs"
          type="password"
          name="password2"
          onChange={handlePasswordMatch}
          htmlvalue={password2}
          placeholder="Re-Enter Password"
          required
        />
        <h1 id="matchError" style={{ color: `${success}` }}>
          {message}
        </h1>
        <button className="formBtn" type="submit">
          Submit
        </button>

        <button className="formBtn" style={{ marginTop: "5px" }}>
          <a href="/auth/google">
            <img
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              style={{ height: "15px", width: "15px" }}
            />{" "}
            Sign Up with Google
          </a>
        </button>
      </form>
    </div>
  );
}

export default Register;
