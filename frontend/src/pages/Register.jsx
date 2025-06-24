import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});

        if (password !== confirm) {
            setErrors({match: "Passwords do not match."});
            return;
        }

        try {
            await api.post("/auth/register", {
                username,
                password,
            });
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <div className="flex items-center justify-center px-4 pt-15">
            <form
                onSubmit={handleRegister}
                className="bg-white shadow-md rounded p-6 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Register</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-600">Username</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                {errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-600">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                <div className="mb-6">
                    <label className="block mb-1 text-sm text-gray-600">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>
                {errors.match && <p className="text-red-500 text-sm mb-4">{errors.match}</p>}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
