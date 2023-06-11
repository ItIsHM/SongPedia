import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Player(props) {
  // Download Function
  const downloadSong = async () => {
    if (!confirm("Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and SongPedia will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.")) return false;

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`);
    props.setProgress(10);

    const url = props.details.downloadUrl[4]["link"];
    window.location.href = url; // Directly initiate the download

    props.setProgress(100);
  };

  const navigate = useNavigate(); //for navigating to /search if details are not supplied
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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
      audio.play();
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      document.title = `Paused ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
      audio.pause();
      setIsPlaying(false);
    } else {
      document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (duration / 100) * e.target.value;
    audio.currentTime = seekTime;
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleNext = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const currentMins = Math.floor(currentTime / 60);
  const currentSecs = Math.floor(currentTime % 60);
  const durationMins = Math.floor(duration / 60);
  const durationSecs = Math.floor(duration % 60);

  return (
    <>
      {/* Show player only if details are received */}
      {props.details && (
        <div className={props.theme}>
                    <div className="player" id="player">
            <div className="song-details">
              <img src={props.details.image} alt={props.details.name} className="song-image" />
              <div className="song-info">
                <h3>{props.details.name}</h3>
                <p>{props.details.artists}</p>
              </div>
            </div>
            <div className="controls">
              <button className="prev-button" onClick={handlePrevious}>
                <i className="fas fa-step-backward"></i>
              </button>
              <button className="play-pause-button" onClick={handlePlayPause}>
                {isPlaying ? (
                  <i className="fas fa-pause"></i>
                ) : (
                  <i className="fas fa-play"></i>
                )}
              </button>
              <button className="next-button" onClick={handleNext}>
                <i className="fas fa-step-forward"></i>
              </button>
            </div>
            <div className="timebar">
              <span>{currentMins < 10 ? `0${currentMins}` : currentMins}:{currentSecs < 10 ? `0${currentSecs}` : currentSecs}</span>
              <input
                type="range"
                className="seek-bar"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
              />
              <span>{durationMins < 10 ? `0${durationMins}` : durationMins}:{durationSecs < 10 ? `0${durationSecs}` : durationSecs}</span>
            </div>
            <div className="download-button">
              <button onClick={downloadSong}>Download</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Player;

