"use client";

import { SyntheticEvent, useState } from "react";
import Head from "next/head";

export default function Page() {
  /* data */
  const BASE_URL = `http://localhost:8000`;

  const [form, setForm] = useState({
    data: {
      name: "",
      email: "",
      password: "",
    },
    response: {
      message: "",
      errors: {
        name: [],
        email: [],
        password: [],
      },
    },
  });

  /* method */
  const clearForm = () => {
    setForm({
      data: {
        name: "",
        email: "",
        password: "",
      },
      response: {
        message: "",
        errors: {
          name: [],
          email: [],
          password: [],
        },
      },
    });
  };

  const formHandler = (event: SyntheticEvent) => {
    setForm({
      ...form,
      data: {
        ...form.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.data),
    });

    const responseJson = await response.json();

    if (response.status === 200) {
      alert("Account created!");
      clearForm();
    }

    setForm({
      ...form,
      response: {
        ...form.response,
        ...responseJson,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="flex flex-col gap-y-3 justify-center items-center w-full h-screen bg-white">
        <h1 className="text-2xl">Register</h1>

        <form className="flex flex-col gap-y-6" onSubmit={submit}>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              name="name"
              id="name"
              className="p-2 border border-black"
              value={form.data.name}
              onInput={formHandler}
            />

            {form.response.errors.name &&
              form.response.errors.name.map((message) => (
                <span className="text-xs text-red-500">* {message}</span>
              ))}
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              name="email"
              id="email"
              className="p-2 border border-black"
              value={form.data.email}
              onInput={formHandler}
            />

            {form.response.errors.email &&
              form.response.errors.email.map((message) => (
                <span className="text-xs text-red-500">* {message}</span>
              ))}
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Password</label>

            <input
              type="password"
              name="password"
              id="password"
              className="p-2 border border-black"
              value={form.data.password}
              onInput={formHandler}
            />

            {form.response.errors.password &&
              form.response.errors.password.map((message) => (
                <span className="text-xs text-red-500">* {message}</span>
              ))}
          </div>

          <button type="submit" className="p-3 text-white bg-sky-500">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
