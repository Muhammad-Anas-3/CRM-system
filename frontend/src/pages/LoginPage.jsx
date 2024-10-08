import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(
                "https://crm-system-backend.vercel.app/api/auth/login",
                {
                    email,
                    password,
                }
            );
            toast.success("Login Successful");
            console.log(res.data);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(res.data));
            // Navigate to the customers page
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.msg || "An error occurred");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col m-2">
            <div className="bg-white p-8 rounded shadow-xl sm:w-96">
                <h2 className="text-[20px] mb-4 font-semibold">Admin Login Page</h2>
                <p>
                    For testing purpose you can use this email: <b>admin@gmail.com</b> and
                    password: <b>admin</b>
                </p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">
                            Email:
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            type="email"
                            id="email"
                            className="w-full border p-2 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">
                            Password:
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            type="password"
                            id="password"
                            className="w-full border p-2 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 rounded-md ${loading
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                    >
                        Log in
                    </button>
                </form>
            </div>
            <div className="error flex justify-end items-center h-10">
                {error && (
                    <span className="p-1 rounded text-red-600 bg-gray-300">{error}</span>
                )}
            </div>
        </div>
    );
};

export default Login;
