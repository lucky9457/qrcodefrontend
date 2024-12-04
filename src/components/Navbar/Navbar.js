import React from 'react'
import "./Navbar.css"
const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navoverlay'>
                <h1>Qr Code Generator</h1>
                <div className='navitems'>
                    <button >Home</button>
                    <button >Services</button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
