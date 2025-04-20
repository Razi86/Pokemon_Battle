import React, { useState, useContext } from "react";
import axios from "axios";
import { ORIGIN_URL } from "../config";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${ORIGIN_URL}users/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setSuccess("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center w-full max-w-[30rem] h-[35rem] p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-medium text-center text-blue-900">
          Login
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="form-control w-full">
            <label className="label text-blue-900">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-blue-900">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          <p className="text-center text-blue-900">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600 font-semibold">
              Register here
            </NavLink>
          </p>
          <p className="text-center text-blue-900">
            Forgot your password?{" "}
            <NavLink to="/profile" className="text-blue-600 font-semibold">
              Reset here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
