import React from "react";
import { useState } from "react";
import post from "../api/api";
export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted", formData);
    const data = await post({
      endpoint: "/register",
      body: formData,
    });
    console.log(data);
    setFormData({ userName: "", email: "", password: "" });
  }

  function handleData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="flex justify-center items-center w-dvw h-dvh">
      <form
        className="flex flex-col gap-1.5 border p-3 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="userName">Enter Your Name</label>
        <input
          id="userName"
          type="text"
          name="userName"
          className="border rounded-xl"
          value={formData.userName}
          onChange={handleData}
        />

        <label htmlFor="email">Enter Your Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="border rounded-xl"
          value={formData.email}
          onChange={handleData}
        />

        <label htmlFor="password">Enter Your Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="border rounded-xl"
          value={formData.password}
          onChange={handleData}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="border bg-amber-200 h-12.5 w-25 rounded-2xl"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
