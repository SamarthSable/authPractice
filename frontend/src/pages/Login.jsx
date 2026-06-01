import React, { useState } from "react";
import { Link } from "react-router-dom";
import post from "../api/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const response = await post({
      endpoint: "/login",
      body: formData,
    });
    if (response.message === "Login Success") {
      navigate("/dashboard");
    }
    console.log(response);
    setFromData({
      email: "",
      password: "",
    });
  }
  function handleData(e) {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div>
      <div className="flex justify-center items-center w-dvw h-dvh ">
        <form
          className="flex flex-col gap-1.5 border p-3 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Enter Your Email</label>
          <input
            type="email"
            name="email"
            className="border rounded-xl"
            value={formData.email}
            onChange={handleData}
          />
          <label htmlFor="password">Enter Your Password</label>
          <input
            type="password"
            name="password"
            className="border rounded-xl"
            value={formData.password}
            onChange={handleData}
          />
          <div className="flex justify-center">
            <button
              className="border bg-amber-200 h-12.5 w-25 rounded-2xl"
              type="submit"
            >
              Login
            </button>

            <Link
              to={"/register"}
              className="border bg-amber-200 h-12.5 w-25 rounded-2xl flex items-center justify-center"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
