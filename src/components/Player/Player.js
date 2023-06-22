import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import fileDownload from 'js-file-download';

function Player(props) {
  // Download Functions
  /**
   * Helper function for downloadSong
   * @param {string} blob The blobURL of the song.
   * @param {string} filename The name with which to download the file.
   */
  const downloadSong = async (blob, filename) => {
    if (
      !window.confirm(
        'Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and SongPedia will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.'
      )
    ) {
      return false;
    }

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')} - High Quality`);
    props.setProgress(10);

    props.setProgress(50);

    props.setProgress(70);
    fileDownload(blob, filename); // Using js-file-download library to download the file

    props.setProgress(90);
    props.setProgress(100);
  };

  /** High Quality */
  const downloadHighQuality = async () => {
    const url = props.details.downloadUrl[4].link;
    const filename =
      props.details.name.replace(/&quot;/g, '"') +
      ` - ${props.details.primaryArtists.split(',')[0]} 320kbps SongPedia.mp3`;
    const response = await fetch(url);
    const blob = await response.blob();

    downloadSong(blob, filename);
  };

  /** Medium Quality */
  const downloadMediumQuality = async () => {
    const url = props.details.downloadUrl[3].link;
    const filename =
      props.details.name.replace(/&quot;/g, '"') +
      ` - ${props.details.primaryArtists.split(',')[0]} 320kbps SongPedia.mp3`;
    const response = await fetch(url);
    const blob = await response.blob();

    downloadSong(blob, filename);
  };

  /** Low Quality */
  const downloadLowQuality = async () => {
    const url = props.details.downloadUrl[0].link;
    const filename =
      props.details.name.replace(/&quot;/g, '"') +
      ` - ${props.details.primaryArtists.split(',')[0]} 320kbps SongPedia.mp3`;
    const response = await fetch(url);
    const blob = await response.blob();

    downloadSong(blob, filename);
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

    const handleLoadedMetadata = () => {
      setIsPlaying(true);
      setDuration(audio.duration);
      audio.play();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [props.details]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = e.target.value;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div id="player">
      <div className="player-details">
        <div className="player-image">
          <img src={props.details.image} alt={props.details.name} />
        </div>
        <div className="player-info">
          <h2>{props.details.name}</h2>
          <p>{props.details.primaryArtists}</p>
        </div>
      </div>
      <div className="player-controls">
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-bar">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            step={0.1}
          />
          <div className="progress-bar-timestamps">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="player-download">
        <h3>Download</h3>
        <div className="download-options">
          <button onClick={downloadHighQuality}>High Quality</button>
          <button onClick={downloadMediumQuality}>Medium Quality</button>
          <button onClick={downloadLowQuality}>Low Quality</button>
        </div>
      </div>
      <audio ref={audioRef} src={props.details.mediaUrl} />
    </div>
  );
}

export default Player;
