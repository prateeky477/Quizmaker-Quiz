import React, { useState } from 'react';
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const SignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        }
        catch (err) {
            console.error(err)
        }
    };

    console.log(auth?.currentUser?.email);

    const SignInwithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        }
        catch (err) {
            console.error(err)
        }

    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                className="w-full max-w-md p-4 bg-white rounded-md shadow-md"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <motion.button
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={SignIn}
                        whileHover={{ backgroundColor: "#2c5282" }}
                        whileTap={{ backgroundColor: "#1a365d" }}
                    >
                        Sign In
                    </motion.button>
                </form>
                <p className="text-center my-4">Or</p>
                <motion.button
                    className="w-full py-2 px-4 bg-white border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={SignInwithGoogle}
                    whileHover={{ backgroundColor: "#f6e05e" }}
                    whileTap={{ backgroundColor: "#fbbf24" }}
                >
                    Sign In With Google
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Login;
