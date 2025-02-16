import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
//https://rzn076.github.io/blogs/mpdhls.html?get=aHR0cHM6Ly93b3dvd29peS5jb20vbGl2ZS92MS83ZVRvWFptSmlGRmVFWjhRdmRXcmZZSEwrOWJuSjBoK2paRG9XMVFzcC10dUY2NFc2eXZJN1gwOGFCTlZIaVFqL21hc3Rlci5tM3U4&id=4jwq2ghe2o00m0v_67b08ca983906d23aa0f6081_1
function NavBar({ user }) {
    const menuRef = useRef(null); // Ref for closing the menu

    const handleLogout = async () => {
        const auth = getAuth(); // Ensure fresh auth instance
        await signOut(auth);
    };

    const toggleMenu = () => {
        menuRef.current.classList.toggle('hidden');
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                menuRef.current.classList.add('hidden');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header>
            <nav className="flex items-center justify-between w-full py-2 md:py-3 px-4 fixed top-0 z-50 bg-deep-900 text-white">
                {/* Logo */}
                <Link to="/" className="flex flex-col">
                    <span className="text-xl font-medium">SongPedia</span>
                    {user && <span className="text-xs">Made for <span className="green-400"> {user.displayName}</span></span>}
                </Link>

                {/* User Info & Menu */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full" />
                    ) : (
                        <Link to="/login" className="px-4 py-2 bg-blue-500 rounded-lg">Login</Link>
                    )}

                    {/* Menu Button */}
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer"
                            viewBox="0 0 24 24"
                            stroke="white"
                            fill="none"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Dropdown Menu */}
                <div ref={menuRef} className="hidden absolute right-4 top-12 bg-gray-800 p-4 rounded-lg shadow-lg">
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
