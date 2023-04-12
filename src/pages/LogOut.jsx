import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
const LogOut = ({ setIsAuth }) => {

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
        <div><button onClick={SignOut}>Logout</button></div>
    )
}

export default LogOut