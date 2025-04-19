import React, { useState } from "react";
import axios from "axios";
import { ORIGIN_URL } from "../config";
import { useNavigate, NavLink } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${ORIGIN_URL}users/register`,
        formData
      );
      setSuccess("Registration successful! You can now log in.");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center w-full max-w-[30rem] h-[42rem] p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-medium text-center text-blue-900">
          Register
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <div className="form-control">
            <label className="label text-blue-900">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-blue-900">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-blue-900">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-blue-900">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input text-blue-900 input-bordered border-blue-900 bg-transparent w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
          <p className="text-center text-blue-900">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600 font-semibold">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
