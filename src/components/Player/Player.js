import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Player(props) {
  // Download Functions
  const [selectedQuality, setSelectedQuality] = useState(''); // State to store selected quality

  /**
   * Helper function for downloadSong
   * @param {Blob} blob The blobURL of the song.
   * @param {string} filename The name with which to download the file.
   */
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

  /**
   * Starts downloading the song from the selected quality link sent in props.
   */
  const downloadSong = async () => {
    if (
      !confirm(
        'Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and SongPedia will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.'
      )
    )
      return false;

    if (!selectedQuality) {
      alert('Please select a download quality.');
      return;
    }

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`);
    props.setProgress(10);

    const qualityLink = props.details.downloadUrl.find((item) => item.quality === selectedQuality).link;
    const filename = `${props.details.name.replace(/&quot;/g, '"')} - ${props.details.primaryArtists.split(',')[0]}.m4a`;

    const response = await fetch(qualityLink);

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
    } else {
      document.title = `Playing ${props.details.name.replace(/&quot;/g, '"')} - SongPedia`;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {props.details && (
        <div className={props.theme}>
          <section className="py-10 text-gray-900 dark:text-gray-400 bg-light-100 dark:bg-deep-900 body-font px-4" id="player">
            <div className="min-h-screen bg-light-100 dark:bg-deep-900 flex flex-col items-center justify-center">
              <div className="max-w-xl bg-light-200 dark:bg-deep-900 rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  {/* Rest of the code */}
                  <audio src={props.details.media_url} ref={audioRef}></audio>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-gray-900 via-transparent to-transparent pointer-events-none" />

                  {/* Rest of the code */}

                  <ul className="text-xs sm:text-base divide-y border-t cursor-default">
                    <li className="flex items-center space-x-3">
                      <button className="p-3 group focus:outline-none" id="favBtn">
                        {/* Favorite icon */}
                      </button>

                      <div className="flex-1"></div>

                      <button
                        className="focus:outline-none pr-4 group"
                        id="downloadBtn"
                        onClick={() => downloadSong()}
                      >
                        <svg
                          className="w-4 h-4 group-hover:dark:text-white group-hover:text-gray-800"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Player;
