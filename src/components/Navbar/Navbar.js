import React from 'react'
import "./Navbar.css"
const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1>Qr Code Generator</h1>
            <div className='navitems'>
                <button >Home</button>
                <button >Services</button>
            </div>
        </nav>
    )
}

export default Navbar
