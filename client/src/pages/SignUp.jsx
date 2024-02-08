import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { set } from "mongoose";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData, //spread oprator
      [e.target.id]: e.target.value.trim(),
    });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        Navigate("/sign-in");
      }
    } catch (err) {
      setError("err.message  ");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 vi-purple-500 to-pink-500 rounded-lg text-white">
              Vivek's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Create an account to start sharing your thoughts. Join our blogging
            community today and unleash your creativity. Sign up now!
          </p>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              {" "}
              Sign In
            </Link>
          </div>
          {
            // Show error message
            error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default SignUp;
