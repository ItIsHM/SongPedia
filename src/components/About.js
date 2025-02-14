import React, { useEffect } from 'react';

function About(props) {

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.title = "About - SongPedia";
  }, []);

  return (
    <div className={props.theme}>
      <section className="text-gray-700 dark:text-gray-400 body-font bg-light-100 dark:bg-deep-900">
        <div className="container px-5 pt-28 pb-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-green-700 dark:text-green-400 tracking-widest font-medium title-font mb-1">USING UNOFFICIAL PRIVATE API</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black dark:text-white">SongPedia</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">With SongPedia, you can listen and download over 80 million songs for FREE without any ads!</p>
          </div>
          <div className="flex flex-col text-center mb-2">
            <h2 className="text-sm text-green-700 dark:text-green-400 tracking-widest font-medium title-font mb-1">FEATURES</h2>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Ad-Free Experience</h2>
                <p className="leading-relaxed text-base">Enjoy uninterrupted listening without any ads.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Completely Free</h2>
                <p className="leading-relaxed text-base">You don't have to pay a dime to access SongPedia. It's completely free!</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Easy Downloads</h2>
                <p className="leading-relaxed text-base">SongPedia allows you to easily download your favorite songs, albums, or playlists so that you can listen to them offline.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Highest Quality Music</h2>
                <p className="leading-relaxed text-base">SongPedia allows you to listen to your favorite songs at the highest quality (320kbps!).</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Trending and Popular Music</h2>
                <p className="leading-relaxed text-base">SongPedia is constantly updated with the latest music, thanks to JioSaavn.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border hover:bg-light-200 dark:hover:bg-gray-900 md:h-40 h-auto border-gray-700 border-opacity-75 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">Easy Search Functionality</h2>
                <p className="leading-relaxed text-base">With SongPedia's intuitive search functionality, you can quickly and easily find your favorite songs, albums, and playlists.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
