import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../services/apiSlice";
import imageBG from "../../assets/images/wp2381640.jpg";
const initialData = { name: "", email: "", phone: "", password: "" };
const error = "border-red-500";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [register, registerResponseInfo] = useRegisterMutation();
  const [registerError, setRegisterLoginError] = useState(false);

  const handleError = () => {
    toast.error("Login failed");
    setRegisterLoginError(true);
    setFormData((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success("Registration successful");
          setRegisterLoginError(false);
          navigate("/login", { replace: true });
          setFormData(initialData);
        } else {
          handleError();
        }
      })
      .catch(() => {
        handleError();
      });
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)
      ),url(${imageBG})`,
          position: "relative",
          backgroundSize: "cover",
          minHeight: "110vh",
          width: "100%",
        }}
        className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50"
      >
        <div
          style={{
            background:
              "linear-gradient(146.98deg, #2F3135 7.55%, rgba(38, 41, 49, 0) 100%)",
            backDrop: "blur(35px)",
          }}
          className="w-full px-6 py-4 mt-6 mb-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg"
        >
          <div className="text-3xl font-semibold text-center text-cyan-700 uppercase mt-5 mb-12">
            <a href="/">
              <img
                style={{
                  width: "250px",
                  margin: "10px auto",
                }}
                src="https://res.cloudinary.com/hostingimagesservice/image/upload/v1677436613/My_project-1_1_rbvhqi.png"
                alt=""
              />{" "}
              {/* <h3 className="text-4xl font-bold text-cyan-600">
                                NDAS <span> &#8594; </span> Sign In
                            </h3> */}
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  disabled={registerResponseInfo.isLoading}
                  required
                  name="name"
                  onChange={handleOnChange}
                  value={formData.name}
                  type="text"
                  className={
                    "block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" +
                    (registerError && error)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  disabled={registerResponseInfo.isLoading}
                  required
                  name="email"
                  onChange={handleOnChange}
                  value={formData.email}
                  type="email"
                  className={
                    "block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" +
                    (registerError && error)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white undefined"
              >
                Phone
              </label>
              <div className="flex flex-col items-start">
                <input
                  disabled={registerResponseInfo.isLoading}
                  required
                  name="phone"
                  onChange={handleOnChange}
                  value={formData.phone}
                  type="tel"
                  className={
                    "block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" +
                    (registerError && error)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  disabled={registerResponseInfo.isLoading}
                  required
                  value={formData.password}
                  onChange={handleOnChange}
                  name="password"
                  type="password"
                  className={
                    "block w-full px-4 py-2 mt-2 text-cyan-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40" +
                    (registerError && error)
                  }
                />
              </div>
            </div>
            <a href="#" className="text-xs text-cyan-600 hover:underline">
              Forget Password?
            </a>
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-white">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="text-cyan-600 hover:underline">
                Sign In
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-cyan-400 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
            <button
              aria-label="Login with GitHub"
              role="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-cyan-400 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p>Login with GitHub</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
