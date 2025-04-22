import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(AuthContext);
  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setUpdateUser({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `${ORIGIN_URL}users/${user.id}`,
        updateUser,
        { withCredentials: true }
      );
      setUser(response.data.user);
      setSuccess("Profile updated successfully!");
      setUpdateUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      await logout();
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Not logged in.</p>;
  }

  return (
    <div className="profileContainer w-full h-[100vh] flex justify-center items-center pt-[109.25px] bg-white rounded shadow-md">
      <div className="content flex flex-col justify-start w-[60rem] h-[calc(100vh-109.25px)] p-[5rem] bg-white">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Profile</h1>
        <div className="userInfo">
          <div className="space-y-2 mb-6">
            <p className="text-lg text-blue-900">
              <strong className="text-blue-900">First Name:</strong>{" "}
              {user.first_name}
            </p>
            <p className="text-lg text-blue-900">
              <strong className="text-blue-900">Last Name:</strong>{" "}
              {user.last_name}
            </p>
            <p className="text-lg text-blue-900">
              <strong className="text-blue-900">Email:</strong> {user.email}
            </p>
            <p className="text-lg text-blue-900">
              <strong className="text-blue-900">Role:</strong> {user.role}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900">First Name</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name"
              className="input input-bordered border-blue-900 w-full bg-white text-blue-900"
              value={updateUser.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900">Last Name</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              className="input input-bordered border-blue-900 w-full bg-white text-blue-900"
              value={updateUser.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered border-blue-900 w-full bg-white text-blue-900"
              value={updateUser.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter a new password"
              className="input input-bordered border-blue-900 w-full bg-white text-blue-900"
              value={updateUser.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
