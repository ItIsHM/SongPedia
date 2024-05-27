import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import Heading from './Heading';
import Songs from './Songs';
import Albums from './Albums';
import Playlists from './Playlists';

function Showcase(props) {
  const navigate = useNavigate();

  const [trending_songs, setTrendingSongs] = useState([]);
  const [trending_albums, setTrendingAlbums] = useState([]);
  const [top_albums, setTopAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [charts, setCharts] = useState([]);

  const searchFromId = async (id) => {
    let raw_resp = await fetch(`https://down-spot.vercel.app/songs?id=${id}`);
    let resp = await raw_resp.json();
    props.setDetails(resp.data[0]);
    navigate("/listen");
  };

const setHomepageData = async () => {
    // Fetch the user's IP address
    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();

    // Get user's location using IP address
    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const locationData = await locationResponse.json();

    // Extract user's state (region)
    const state = locationData.regionName.toLowerCase(); // Convert state name to lowercase for consistency

    // Use language detection library to detect user's language based on state
    const detectedLanguage = detectLanguage(state);

    // Set the language dynamically
    let uri = `https://down-spot.vercel.app/modules?language=${detectedLanguage}`;
    props.setProgress(30);
    let data = await fetch(uri);
    props.setProgress(50);
    let resp = await data.json();
    props.setProgress(70);
};

// Function to detect language based on state (region)
const detectLanguage = (state) => {
    // Mapping of states to languages
    const stateLanguageMapping = {
        'andhra pradesh': 'te', // Andhra Pradesh -> Telugu
        'arunachal pradesh': 'en', // Arunachal Pradesh -> English (Assumption)
        'assam': 'as', // Assam -> Assamese
        'bihar': 'hi', // Bihar -> Hindi
        'chhattisgarh': 'hi', // Chhattisgarh -> Hindi
        'goa': 'en', // Goa -> English (Assumption)
        'gujarat': 'gu', // Gujarat -> Gujarati
        'haryana': 'hi', // Haryana -> Hindi
        'himachal pradesh': 'hi', // Himachal Pradesh -> Hindi
        'jammu and kashmir': 'ur', // Jammu and Kashmir -> Urdu
        'jharkhand': 'hi', // Jharkhand -> Hindi
        'karnataka': 'kn', // Karnataka -> Kannada
        'kerala': 'ml', // Kerala -> Malayalam
        'madhya pradesh': 'hi', // Madhya Pradesh -> Hindi
        'maharashtra': 'mr', // Maharashtra -> Marathi
        'manipur': 'en', // Manipur -> English (Assumption)
        'meghalaya': 'en', // Meghalaya -> English (Assumption)
        'mizoram': 'en', // Mizoram -> English (Assumption)
        'nagaland': 'en', // Nagaland -> English (Assumption)
        'odisha': 'or', // Odisha -> Odia
        'punjab': 'pa', // Punjab -> Punjabi
        'rajasthan': 'hi', // Rajasthan -> Hindi
        'sikkim': 'en', // Sikkim -> English (Assumption)
        'tamil nadu': 'ta', // Tamil Nadu -> Tamil
        'telangana': 'te', // Telangana -> Telugu
        'tripura': 'en', // Tripura -> English (Assumption)
        'uttar pradesh': 'hi', // Uttar Pradesh -> Hindi
        'uttarakhand': 'hi', // Uttarakhand -> Hindi
        'west bengal': 'bn', // West Bengal -> Bengali
        // Add more state to language mappings as needed
    };

    // Convert state name to lowercase
    const stateLowerCase = state.toLowerCase();

    // If the state is in the mapping, return the corresponding language
    // Otherwise, return a default language
    return stateLanguageMapping[stateLowerCase] || 'en'; // Default to English
};


    setTrendingSongs(getShowcase(resp["data"]["trending"]["songs"], "song"));
    setTrendingAlbums(getShowcase(resp["data"]["trending"]["albums"], "album"));
    setTopAlbums(getShowcase(resp["data"]["albums"], "album"));
    setPlaylists(getShowcase(resp["data"]["playlists"], "playlist"));
    setCharts(getShowcase(resp["data"]["charts"], "playlist"));

    props.setProgress(100);
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
    return array;
  };

  const getShowcase = (data, type) => {
    let data_showcase = [];
    let count = 0;
    while (count < 10) {
      if (data_showcase.length === 4) break;
      if (data[count] && data[count].type == type) {
        let data_name = data[count]["name"] ? data[count]["name"] : data[count]["title"];
        data_showcase.push({
          name: data_name,
          image: data[count]["image"][2]["link"],
          id: data[count]["id"]
        });
      }
      count += 1;
    }
    return shuffle(data_showcase);
  };

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.title = "Popular Now - SongPedia";
    setHomepageData();
  }, []);

  return (
   <div className={props.theme}>
     /* <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="yourCookieName"
        style={{ background: "#333" }}
        buttonStyle={{ color: "#fff", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to ensure you get the best experience on our website.
      </CookieConsent> */

      <section className="text-white dark:text-gray-400 bg-light-100 dark:bg-deep-900 body-font justify-center py-5">
        <div className="container px-5 py-24 mx-auto mb-0 ">
          <Heading title="Trending Now" />
          <Songs songs={trending_songs} searchFromId={searchFromId} />

          <Heading title="Popular Albums" />
          <Albums albums={trending_albums} setAlbumId={props.setAlbumId} />

          <Heading title="Editorial Picks" />
          <Albums albums={top_albums} setAlbumId={props.setAlbumId} />

          <Heading title="Top Charts" />
          <Playlists playlists={charts} setPlaylistId={props.setPlaylistId} />

          <Heading title="Made for you" />
          <Playlists playlists={playlists} setPlaylistId={props.setPlaylistId} />
        </div>
      </section>
    </div>
  );
}

export default Showcase;
