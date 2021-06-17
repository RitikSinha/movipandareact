import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav id="navbar">
            <div className="container">
                <Link to="/">
                <img alt="logo" width={120} src={logo}/>   
                </Link>
           
            <div>
                <Link to="/upload">
                   Upload
                </Link>
            </div>

            </div>
         
            

        </nav>
    )
}
