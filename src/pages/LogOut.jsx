import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
const LogOut = ({ setIsAuth }) => {
    const navigate = useNavigate();
    const SignOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            setIsAuth(false);
            navigate("/");
        }
        catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex justify-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={SignOut}>Logout</button>
        </div>
    );
}

export default LogOut;
