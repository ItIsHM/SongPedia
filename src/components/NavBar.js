import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import logo from './logo.png';

function NavBar({ user }) {
    const auth = getAuth();
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <header>
            <nav className="flex items-center justify-between w-full py-2 md:py-3 px-4 fixed top-0 z-50 bg-deep-900 text-white">
                {/* Logo */}
                <Link to='/' className="flex items-center text-xl font-medium">
                    
<span className="text-xl block">SongPedia</span>
                            <span className="text-xs block">Made for {user.displayName} </span>
                </Link>

                {/* User Info & Menu */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full" />
                            <span>{user.displayName}</span>
                        </>
                    ) : (
                        <Link to="/login" className="px-4 py-2 bg-blue-500 rounded-lg">Login</Link>
                    )}
                    
                    {/* Menu Button */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="menu-button"
                        onClick={() => document.getElementById("menu").classList.toggle('hidden')}
                        className="h-6 w-6 cursor-pointer"
                        viewBox="0 0 24 24"
                        stroke="white"
                        fill="none"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="hidden absolute right-4 top-12 bg-gray-800 p-4 rounded-lg shadow-lg" id="menu">
                    <ul>
                        <li><Link to="/" className="block py-2">Home</Link></li>
                        <li><Link to="/search" className="block py-2">Search</Link></li>
                        <li><Link to="/about" className="block py-2">About</Link></li>
                        <li><Link to="/terms" className="block py-2">Terms</Link></li>
                        {user && (
                            <li><button onClick={handleLogout} className="block py-2 text-red-500">Logout</button></li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
