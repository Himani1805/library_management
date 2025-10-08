import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(name,username,email,password);

        try {
            const payload = {
                email,
                username,
                name,
                password
            }
            const response = await apiClient.post("/auth/register", payload)
            // console.log("response", response)
            const result = await response.data
            // console.log("result", result)
            if (response.status === 201) {
                console.log("Signup successfull", result)
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-2 py-8'>
            {/* Main container */}
            {/* Unified card containing both image and form */}
            <div className='flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl '>

                {/* Library image */}
                <div className="w-full md:w-3/5 h-[250px] md:h-auto">
                    <img
                        src={"https://res.cloudinary.com/dgbymqjtk/image/upload/v1757842692/SignupImage_jmdp3k.jpg"}
                        alt="Library"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Signup form */}
                <div className="flex flex-col justify-center w-full md:w-2/5 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-center">Welcome to Library Management</h2>
                    <p className="text-gray-500 text-center md:text-center mb-8 text-sm">Create your account and start your Library journey</p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Enter Full Name'
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
                        />
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            placeholder='Username'
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
                        />
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-700"
                        />

                        <button
                            type='submit'
                            className="mt-2 bg-cyan-700 hover:bg-cyan-800  text-white font-semibold py-3 rounded-md transition-colors"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>

                        <div>
                            <p className="mt-2 text-center text-gray-600">Already have an account?{" "}<span className="text-cyan-700 cursor-pointer hover:underline font-medium"><a href="/login">Log In</a></span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
