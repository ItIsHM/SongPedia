import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function NavBar({ user, handleLogout }) {
    return (
        <header>
            <nav className="flex flex-wrap items-center justify-between w-full py-2 md:py-3 px-4 text-lg fixed top-0 z-50 dark:text-gray-700 text-gray-400 dark:bg-light-200 bg-deep-900 body-font">
                {/* Logo */}
                <Link to="/" className="flex title-font font-medium items-center dark:text-white text-white my-1 md:mb-0">
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                    <span className="ml-3 text-xl">SongPedia</span>
                </Link>

                {/* Mobile Menu Button */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    onClick={() => document.getElementById("menu").classList.toggle('hidden')}
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                {/* Navbar Links */}
                <div className="hidden md:flex md:items-center space-x-6">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/search" className="text-white hover:text-gray-300">Search</Link>
                    <Link to="/about" className="text-white hover:text-gray-300">About</Link>
                    <Link to="/terms" className="text-white hover:text-gray-300">Terms</Link>
                </div>

                {/* Profile & Logout Section */}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full border border-gray-300" />
                        <span className="text-white">{user.displayName}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : null}
            </nav>
        </header>
    );
}

export default NavBar;
