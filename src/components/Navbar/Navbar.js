import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <nav className='navbar'>
            <div className='navoverlay'>
                <h1>Qr Code Generator</h1>
                <div className='navitems'>
                    <button >Home</button>
                    <button >Services</button>
                    <button onClick={handlelogout}>
                        Logout
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
