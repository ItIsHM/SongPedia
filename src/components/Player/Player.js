import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Player(props) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const toggleDownloadMenu = () => {
    setShowDownloadMenu(!showDownloadMenu);
  };

  const handleDownload = async (quality) => {
    if (
      !window.confirm(
        'Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and SongPedia will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.'
      )
    ) {
      return;
    }

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`);
    props.setProgress(10);

    let downloadUrl;

    if (quality === 'low') {
      downloadUrl = props.details.downloadUrl[2]['link'];
    } else if (quality === 'medium') {
      downloadUrl = props.details.downloadUrl[3]['link'];
    } else if (quality === 'high') {
      downloadUrl = props.details.downloadUrl[4]['link'];
    }

    const filename =
      props.details.name.replace(/&quot;/g, '"') +
      ` - ${props.details.primaryArtists.split(',')[0]}.m4a`;

    const response = await fetch(downloadUrl);

    props.setProgress(50);
    const blob = await response.blob();

    props.setProgress(70);
    const blobUrl = window.URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
  };

  const downloadBlob = (blob, filename) => {
    const a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    props.setProgress(90);
    a.click();
    a.remove();
    props.setProgress(100);
  };

  const navigate = useNavigate(); // for navigating to /search if details are not supplied

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!props.details) {
      navigate('/search');
      return;
    }
    document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
    const audio = audioRef.current;
    document.getElementById('player').scrollIntoView(true);
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
      document.title = `Playing ${props.details.
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = e.target.value;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="player" id="player">
      <div className="player-details">
        <img
          src={props.details.image}
          alt={props.details.name}
          className="player-image"
        />
        <div className="player-info">
          <h2 className="player-song">{props.details.name}</h2>
          <h3 className="player-artist">{props.details.primaryArtists}</h3>
          <div className="player-controls">
            <button
              className="player-btn"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <i className="fa fa-pause" />
              ) : (
                <i className="fa fa-play" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="player-progress"
            />
            <div className="player-time">
              <span className="player-current-time">
                {formatTime(currentTime)}
              </span>
              <span className="player-duration">
                {formatTime(duration)}
              </span>
            </div>
            <button
              className="player-btn"
              onClick={toggleDownloadMenu}
            >
              <i className="fa fa-download" />
            </button>
            {showDownloadMenu && (
              <div className="player-download-menu">
                <button
                  className="player-download-option"
                  onClick={() => handleDownload('low')}
                >
                  Low Quality
                </button>
                <button
                  className="player-download-option"
                  onClick={() => handleDownload('medium')}
                >
                  Medium Quality
                </button>
                <button
                  className="player-download-option"
                  onClick={() => handleDownload('high')}
                >
                  High Quality
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={props.details.audioUrl} />
    </div>
  );
}

export default Player;
