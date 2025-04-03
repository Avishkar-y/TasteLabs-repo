import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // For navigation after successful registration

// Register component allows users to sign up
const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext); // Access register function from context

  // Form state
  const [name, setname] = useState("");
  const [gmail, setgmail] = useState("");
  const [password, setpassword] = useState("");

  // Handle registration form submission
  const registerHandler = async (e) => {
    e.preventDefault();
    
    // Call register function with form values
    const result = await register(name, gmail, password);

    // Show toast notification with API response
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.log(result.data);

    // Redirect to login page if registration is successful
    if (result.data.message !== "User Already exist") {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <>
      {/* Registration form container */}
      <div
        className="container my-5 p-5"
        style={{
          width: "500px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Register</h2>

        {/* Registration form */}
        <form
          onSubmit={registerHandler}
          style={{ width: "420px", margin: "auto" }}
          className="my-3 p-3"
        >
          {/* Name input */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
              required
              type="email"
              className="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
            />
          </div>

          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          {/* Submit button */}
          <div className="container d-grid col-6">
            <button type="submit" className="btn btn-primary mt-3">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
