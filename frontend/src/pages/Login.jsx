import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();



    setLoading(true)
    // console.log(email,password);

    try {
      const payload = {
        email,
        password
      }
      const response = await apiClient.post("/auth/login", payload)

      // console.log("My Login");
      console.log("response", response)
      const result = response.data
      console.log("result", result)

      if (response.status === 200) {
        localStorage.setItem("token", result?.token);
        localStorage.setItem("user", JSON.stringify(result?.user));

        setTimeout(() => {
          result?.user?.role === "admin" ? navigate("/admin") : navigate("/dashboard");
          window.location.reload();
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-xl overflow-hidden bg-white'>
        {/* Doctor Illustration: visible on all screens, stacked on small, left on large */}
        {/* Library image */}
        <div className="w-full md:w-3/5 h-[250px] md:h-auto">
          <img src={"https://res.cloudinary.com/dgbymqjtk/image/upload/v1757842692/SignupImage_jmdp3k.jpg"}
            alt="Library"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-center">Welcome to Library Management</h2>
            <p className="text-gray-500 text-center md:text-center mb-6 text-sm">Login to access your Library Dashboard</p>
            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <input
                type="text"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder='Email'
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
              />
              <input
                type="checkbox"
                // onChange={(e) => setPassword(e.target.value)}
                // value={checkbox}
                className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
              />

              <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
              <button
                type='submit'
                className="w-full mt-2 bg-cyan-700 hover:bg-cyan-800  text-white font-semibold py-3 rounded-md transition-colors"
              >
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>
            <p className="mt-6 text-center text-gray-600">Don't have an account?{" "}<span className="text-cyan-700 font-medium cursor-pointer hover:underline"><a href="/signup">Sign Up</a></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
