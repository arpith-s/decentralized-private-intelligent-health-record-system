import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import './navcss.css'
import 'materialize-css/dist/css/materialize.min.css'
const Navbar = () => {
    return (
        <nav className="nav-design">
            <div className="container">
                <ul><li className="logo">GAMA</li></ul>
                <ul className="right">
                    <li><a href="/home" className="nav-text"><b>Home</b></a></li>
                    <li><a href="/Labrecord" className="nav-text"><b>ML Options</b></a></li>
                    <li><a href="/pat_activity" className="nav-text"><b>History</b></a></li>
                    <li><a href="/pat_access" className="nav-text"><b>Permissions</b></a></li>
                    <li><a href="/" className="nav-text"><b>Logout</b></a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;