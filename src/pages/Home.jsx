import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

const Home = ({ isAuth,setIsAuth }) => {
    const navigate = useNavigate()
    const SignOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear()
            setIsAuth(false)
            navigate("/")
        }
        catch (err) {
            console.error(err)
        }

    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-100">
            <div className="mb-4 lg:mb-0">
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
                    whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
                >
                    Help
                </motion.button>
            </div>
            <div className="mb-4 lg:mb-0">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-gray-900"
                >
                    <span className="tracking-wider">B-</span>
                    <span className="tracking-widest">S</span>
                    <span className="tracking-wider">torm</span>
                </motion.h1>
            </div>
            <div>
                <Link to='/login'>
                    {!isAuth && <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
                        whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
                    >
                        SignIn
                    </motion.button>}
                </Link>
            </div>
            <div>
                <Link to='/'>
                    {isAuth && <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
                        whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
                        onClick={SignOut}
                    >
                        LogOut
                    </motion.button>}
                </Link>
            </div>
        </div>
    );
};

export default Home;
