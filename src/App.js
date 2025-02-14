import './App.css';
import { Analytics } from '@vercel/analytics/react';
import NavBar from './components/NavBar';
import Showcase from './components/Showcase/Showcase';
import Footer from './components/Footer';
import Search from './components/Search/Search';
import Player from './components/Player/Player';
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Alert from './components/Alert';
import AlbumsShowcase from './components/Showcase/AlbumsShowcase';
import PlaylistsShowcase from './components/Showcase/PlaylistsShowcase';
import About from './components/About';
import Terms from './components/Terms';
import Login from './components/Auth/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [progress, setProgress] = useState(0);
  const [details, setDetails] = useState(null);
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  const [albumId, setAlbumId] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "" : "dark");
    showAlert(theme === "dark" ? "Light mode has been enabled." : "Dark mode has been enabled.");
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

  return (
    <div className={theme}>
      <div className="bg-light-100 dark:bg-deep-900">
        <LoadingBar color='#ff0000' progress={progress} height={3} shadow={false} onLoaderFinished={() => setProgress(0)} />
        <div className='flex flex-col min-h-[100vh] justify-between w-full'>
          <Router>
            <NavBar toggleTheme={toggleTheme} theme={theme} user={user} />
            <Alert message={alert} theme={theme} />
            <Routes>
              {user ? (
                <>
                  <Route exact path="/" element={<Showcase setAlbumId={setAlbumId} setPlaylistId={setPlaylistId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                  <Route exact path="/about" element={<About theme={theme} />} />
                  <Route exact path="/terms" element={<Terms theme={theme} />} />
                  <Route exact path="/albums" element={<AlbumsShowcase albumId={albumId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                  <Route exact path="/playlists" element={<PlaylistsShowcase playlistId={playlistId} setProgress={setProgress} theme={theme} setDetails={setDetails} />} />
                  <Route exact path="/search" element={<Search setProgress={setProgress} theme={theme} setDetails={setDetails} setAlbumId={setAlbumId} setPlaylistId={setPlaylistId} />} />
                  <Route exact path="/listen" element={<Player showAlert={showAlert} theme={theme} setProgress={setProgress} details={details} />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
              <Route exact path="/login" element={<Login />} />
            </Routes>
            <Footer theme={theme} />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
