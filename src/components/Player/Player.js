import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";

function Player(props) {
  // Download Functions
  const downloadBlob = (blob, filename) => {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    props.setProgress(90);
    a.click();
    a.remove();
    props.setProgress(100);
  };

  const downloadSong = async (url) => {
    if (!confirm("Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and SongPedia will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.")) return false;

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`);
    props.setProgress(10);

    const response = await fetch(url);

    props.setProgress(50);
    const blob = await response.blob();

    props.setProgress(70);
    let blobUrl = window.URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
  };

  const navigate = useNavigate(); // for navigating to /search if details are not supplied

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
    <div id="player" className="player">
      <div className="player-details">
        <div className="player-thumbnail">
          <img src={props.details.thumbnail} alt="thumbnail" />
        </div>
        <div className="player-info">
          <h2>{props.details.name}</h2>
          <p>{props.details.artist}</p>
        </div>
      </div>
      <div className="player-controls">
        <button className="player-control-btn" onClick={handlePrevious}>
          <i className="fa fa-step-backward"></i>
        </button>
        <button className="player-control-btn" onClick={handlePlayPause}>
          {isPlaying ? (
            <i className="fa fa-pause"></i>
          ) : (
            <i className="fa fa-play"></i>
          )}
        </button>
        <button className="player-control-btn" onClick={handleNext}>
          <i className="fa fa-step-forward"></i>
        </button>
      </div>
      <div className="player-progress">
        <div className="player-progress-bar">
          <input
            type="range"
            className="player-progress-slider"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <div
            className="player-progress-track"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          ></div>
        </div>
        <div className="player-progress-time">
          <span>
            {currentMins < 10 ? `0${currentMins}` : currentMins}:
            {currentSecs < 10 ? `0${currentSecs}` : currentSecs}
          </span>
          <span>
            {durationMins < 10 ? `0${durationMins}` : durationMins}:
            {durationSecs < 10 ? `0${durationSecs}` : durationSecs}
          </span>
        </div>
      </div>
      <div className="player-download">
        <button
          className="player-download-btn"
          onClick={() => downloadSong(props.details.media_url)}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Player;
