"use client"

import { useState } from "react"

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login form submitted:", form)
  }

  return (
    <div className="flex min-h-screen">
      {/* (blank placeholder) */}
      <div className="hidden md:flex w-1/2 bg-gray-100 relative overflow-hidden">
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back to Paprly
            </h1>
            <p className="text-gray-500">
              Create Professional Invoices for Your Clients.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email id"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Forgot Password + Remember */}
            <div>
              <div className="flex justify-between items-center">
                <a href="/forgot-password" className="text-sm text-gray-900 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Remember sign in details</span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                      form.remember ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 ${
                        form.remember ? "left-6" : "left-0.5"
                      } w-5 h-5 bg-white rounded-full shadow transition-all duration-200`}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Login Btn */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white 
              font-medium py-3 px-6 rounded-full transition-colors duration-200"
            >
              Log in
            </button>

            {/* OR  */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 
              font-medium py-3 px-6 rounded-full flex items-center justify-center gap-3 
              transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}




