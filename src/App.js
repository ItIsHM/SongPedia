import './App.css';
import { Analytics } from '@vercel/analytics/react';
import NavBar from './components/NavBar';
import Showcase from './components/Showcase/Showcase';
import Footer from './components/Footer';
import Search from './components/Search/Search';
import Player from './components/Player/Player';

import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import AlbumsShowcase from './components/Showcase/AlbumsShowcase';
import PlaylistsShowcase from './components/Showcase/PlaylistsShowcase';
import About from './components/About';
import Terms from './components/Terms';

// Firebase imports
import { auth, provider, signInWithPopup, signOut } from './firebase';

function App() {
    const [progress, setProgress] = useState(0);
    const [details, setDetails] = useState(null);
    const [alert, setAlert] = useState(null);
    const [theme, setTheme] = useState("dark");

    const [albumId, setAlbumId] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Prevent flicker

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false); // Ensures no flicker
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("");
            showAlert("Light mode has been enabled.");
        } else {
            setTheme("dark");
            showAlert("Dark mode has been enabled.");
        }
    };

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    useEffect(() => {
        showAlert("By using SongPedia, you agree to be bound by the Terms of Use.");
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
</div>
            
            
        );
    }

    return (
        <div className={theme}>
            <div className="bg-light-100 dark:bg-deep-900">
                <LoadingBar
                    color='#ff0000'
                    progress={progress}
                    height={3}
                    shadow={false}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className='flex flex-col min-h-[100vh] justify-between w-full'>
                    <Router>
                        {user ? (
                            <>
                                <NavBar user={user} handleLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} />
                                <Alert message={alert} theme={theme} />
                                <Routes>
                                    <Route exact path="/" element={<Showcase setAlbumId={setAlbumId} setPlaylistId={setPlaylistId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                                    <Route exact path="/about" element={<About theme={theme} />} />
                                    <Route exact path="/terms" element={<Terms theme={theme} />} />
                                    <Route exact path="/albums" element={<AlbumsShowcase albumId={albumId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                                    <Route exact path="/playlists" element={<PlaylistsShowcase playlistId={playlistId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                                    <Route exact path="/search" element={<Search setProgress={setProgress} theme={theme} setDetails={setDetails} setAlbumId={setAlbumId} setPlaylistId={setPlaylistId} />} />
                                    <Route exact path="/listen" element={<Player showAlert={showAlert} theme={theme} setProgress={setProgress} details={details} />} />
                                </Routes>
                                <Footer theme={theme} />
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white px-6 py-3 rounded">
                                    Continue with Google
                                </button>
                            </div>
                        )}
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
