// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { signOut } from 'firebase/auth'
// import { auth } from '../config/firebase'
// import { useNavigate } from 'react-router-dom'

// const Home = ({ isAuth, setIsAuth }) => {
//     const navigate = useNavigate()

//     const handleSignOut = async () => {
//         try {
//             await signOut(auth);
//             localStorage.clear()
//             setIsAuth(false)
//             navigate("/")
//         } catch (err) {
//             console.error(err)
//         }
//     };

//     return (
//         <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-100">
//             <div className="mb-4 lg:mb-0">
//                 <motion.button
//                     whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
//                     whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
//                 >
//                     Help
//                 </motion.button>
//             </div>
//             <div className="mb-4 lg:mb-0">
//                 <motion.h1
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-3xl font-bold text-gray-900"
//                 >
//                     <span className="tracking-wider">B-</span>
//                     <span className="tracking-widest">S</span>
//                     <span className="tracking-wider">torm</span>
//                 </motion.h1>
//             </div>
//             <div>
//                 {!isAuth && (
//                     <Link to='/login'>
//                         <motion.button
//                             whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
//                             whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
//                         >
//                             Sign In
//                         </motion.button>
//                     </Link>
//                 )}
//                 {isAuth && (
//                     <motion.button
//                         whileHover={{ scale: 1.1, backgroundColor: '#FBBF24' }}
//                         whileTap={{ scale: 0.9, backgroundColor: '#EF4444' }}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 ml-4"
//                         onClick={handleSignOut}
//                     >
//                         Log Out
//                     </motion.button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center sm:text-left">Welcome to the B--TORM App</h1>
            <p className="text-lg text-center mb-8 sm:text-left">
                Test your knowledge with our fun and challenging quizzes! Choose from a variety of topics and levels, or create your own quiz.
            </p>
            <div className="flex justify-center sm:justify-start mb-8">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 mb-4 sm:mb-0">
                    Log in
                </Link>
            </div>
            <p className="text-lg text-center mb-4 sm:text-left">
                To get started, simply choose a quiz from the list below or create your own!
            </p>
            <div className="flex flex-wrap justify-center items-center">

                <Link to="/create" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 mb-4">
                    Create Your Own Quiz
                </Link>
            </div>
        </div>
    );
};

export default Home;
