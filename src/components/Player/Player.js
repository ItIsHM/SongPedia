import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";

function Player(props) {

  // Download Functions (fix)
  const downloadBlob = (blob, filename) => {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    props.setProgress(90)
    a.click();
    a.remove();
    props.setProgress(100)
  }

  const downloadSong = async () => {
    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')} - High Quality`);
    props.setProgress(10);
    const url = props.details.downloadUrl[4]["link"];
    const filename = props.details.name.replace(/&quot;/g, '"') + ` - ${props.details.primaryArtists.split(',')[0]} 320kbps SongPedia`;
    const response = await fetch(url);
    props.setProgress(50);
    const blob = await response.blob();
    props.setProgress(70);
    let blobUrl = window.URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
  };

  const MediumSong = async () => {
    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')} - Medium Quality`);
    props.setProgress(10);
    const url = props.details.downloadUrl[3]["link"];
    const filename = props.details.name.replace(/&quot;/g, '"') + ` - ${props.details.primaryArtists.split(',')[0]} 160kbps SongPedia`;
    const response = await fetch(url);
    props.setProgress(50);
    const blob = await response.blob();
    props.setProgress(70);
    let blobUrl = window.URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
  };

  const LowSong = async () => {
    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')} - Low Quality`);
    props.setProgress(10);
    const url = props.details.downloadUrl[0]["link"];
    const filename = props.details.name.replace(/&quot;/g, '"') + ` - ${props.details.primaryArtists.split(',')[0]} 90kbps SongPedia`;
    const response = await fetch(url);
    props.setProgress(50);
    const blob = await response.blob();
    props.setProgress(70);
    let blobUrl = window.URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
  };

  const navigate = useNavigate(); //for navigating to /search if details are not supplied
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Set favicon and metadata
  const setFavicon = (url) => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = url;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = url;
      document.head.appendChild(newFavicon);
    }
  };

  useEffect(() => {
    if (!props.details) {
      navigate("/search");
      return;
    }
    document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
    const audio = audioRef.current;
    document.getElementById("player").scrollIntoView(true);

    audio.addEventListener('loadedmetadata', () => {
      setIsPlaying(true);
      setDuration(audio.duration);
      setFavicon(props.details.image[2]["link"]); // Set favicon dynamically when metadata is loaded
      audio.play();
    });

    // Auto-play next song when current song ends
    audio.addEventListener('ended', () => {
      // Instead of just resetting, call handleNext() to load the next song
      handleNext();
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    return () => {
      setFavicon("/favicon.ico"); // Reset favicon on cleanup (e.g., component unmount)
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      document.title = `Paused ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`
      audio.pause();
      setIsPlaying(false);
    } else {
      document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (duration / 100) * e.target.value;
    audio.currentTime = seekTime;
  };

  // Updated Previous Button:
  const handlePrevious = () => {
    // Check if current song came from a playlist
    if (props.details.source === "playlist" && props.playlistSongs && props.playlistSongs.length > 0) {
      const currentIndex = props.playlistSongs.findIndex(song => song.id === props.details.id);
      const prevIndex = (currentIndex - 1 + props.playlistSongs.length) % props.playlistSongs.length;
      // Update the current song using parent's setDetails function
      props.setDetails(props.playlistSongs[prevIndex]);
    } else if (props.details.source === "homepage" && props.homepageSongs && props.homepageSongs.length > 0) {
      // For homepage songs, pick a random song
      const randomIndex = Math.floor(Math.random() * props.homepageSongs.length);
      props.setDetails(props.homepageSongs[randomIndex]);
    }
  };

  // Updated Next Button:
  const handleNext = () => {
    if (props.details.source === "playlist" && props.playlistSongs && props.playlistSongs.length > 0) {
      const currentIndex = props.playlistSongs.findIndex(song => song.id === props.details.id);
      const nextIndex = (currentIndex + 1) % props.playlistSongs.length;
      props.setDetails(props.playlistSongs[nextIndex]);
    } else if (props.details.source === "homepage" && props.homepageSongs && props.homepageSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * props.homepageSongs.length);
      props.setDetails(props.homepageSongs[randomIndex]);
    }
  };

  // Reset currentTime when song is changed externally via props.setDetails
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    // Also update document title and favicon if needed
    if (props.details) {
      document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
      setFavicon(props.details.image[2]["link"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.details]);

  const currentMins = Math.floor(currentTime / 60);
  const currentSecs = Math.floor(currentTime % 60);
  const durationMins = Math.floor(duration / 60);
  const durationSecs = Math.floor(duration % 60);

  return (
    <>
      {/* Show player only if details are received */}
      {props.details && 
      <div className={props.theme}>
        <section className="py-2.5 text-gray-900 dark:text-gray-400 bg-light-100 dark:bg-deep-900 body-font px-1" id="player">
          <div className="bg-light-100 dark:bg-deep-900 flex flex-col items-center justify-center">
            <div className="max-w-xl bg-light-200 dark:bg-deep-900 rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img id="thumbnail" className="w-full h-96 object-cover"
                     src={props.details.image[2]["link"]}
                />
                <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
                  <h3 className="font-bold" id="songName">{props.details.name.replace(/&quot;/g, '"')}</h3>
                  <p className="w-fit opacity-70" id="artists_marquee">{props.details.primaryArtists}</p>
                </div>
              </div>
              <audio ref={audioRef} src={props.details.downloadUrl[3]["link"]} />
              {/* Slider */}
              <div>
                <input onChange={handleSeek} min="0" max="100" value={(duration ? (currentTime / duration) * 100 : 0)} type="range" className="w-full accent-green-600" name="slider" id="slider" />
              </div>
              <div className="flex justify-between text-xs font-semibold text-black dark:text-gray-500 px-4 py-2">
                <div id="currentTime">
                  {currentMins}:{currentSecs < 10 ? '0' : ''}{currentSecs}
                </div>
                {/* Controls */}
                <div className="flex space-x-3 p-2">
                  <button className="focus:outline-none" id="previous" onClick={handlePrevious}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                  </button>
                  <button
                    className="rounded-full w-12 h-12 flex items-center justify-center pl-0.5 ring-2 ring-gray-900 dark:ring-gray-100 focus:outline-none hover:animate-pulse"
                    id="controlBtn" onClick={handlePlayPause}>
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                    )}
                  </button>
                  <button className="focus:outline-none" id="next" onClick={handleNext}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </button>
                </div>
                {/* End of Controls */}
                <div id="endTime">
                  {durationMins}:{durationSecs < 10 ? '0' : ''}{durationSecs}
                </div>
              </div>
              <ul className="text-xs sm:text-base divide-y border-t cursor-default">
                <li className="flex items-center space-x-3">
                  <button className="p-3 group focus:outline-none" id="favBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                    </svg>
                  </button>
                  <div className="flex-1"></div>
                  Low Quality 
                  <button className="focus:outline-none pr-4 group" id="downloadBtn" onClick={LowSong}>
                    <svg className="w-4 h-4 group-hover:dark:text-white group-hover:text-gray-800" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                    </svg>
                  </button>
                  <div className="flex-1"></div>
                  Medium Quality 
                  <button className="focus:outline-none pr-4 group" id="downloadBtn" onClick={MediumSong}>
                    <svg className="w-4 h-4 group-hover:dark:text-white group-hover:text-gray-800" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                    </svg>
                  </button>
                  <div className="flex-1"></div>
                  High Quality 
                  <button className="focus:outline-none pr-4 group" id="downloadBtn" onClick={downloadSong}>
                    <svg className="w-4 h-4 group-hover:dark:text-white group-hover:text-gray-800" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                    </svg>
                  </button>
                </li>
                <li className="h-auto text-right text-sm pt-2">
                  <p className="pr-8 pb-2" id="copyrights_label">{props.details.copyright}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>}
    </>
  )
}

export default Player;
