import React, { useEffect } from 'react'

function Terms(props) {

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.title = "Terms of Use - SongPedia"
    }, [])

    return (
        <div className={props.theme}>
            <div className="container px-5 pt-28 pb-10 mx-auto text-gray-700 dark:text-gray-400 body-font bg-light-100 dark:bg-deep-900 ">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-black dark:text-white'>Terms of Use for TuneStation</h1>
                    <p className='text-lg sm:text-xl text-gray-900 dark:text-gray-100'>Welcome to SongPedia, an online music streaming and downloading platform built for the sole purpose of personal use and learning. By accessing or using SongPedia, you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, please <b>do not</b> use SongPedia.</p>
                </div>
                <hr />
                <br />
                <ul className='text-gray'>
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Personal Project:</span> SongPedia is a personal project created for the purpose of learning ReactJS. It is not intended to be monetized or used for any commercial purpose.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Personal Use Only:</span> SongPedia is provided for personal use only. You may use SongPedia to stream or download music for your own personal, non-commercial use.</li>
                 
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Prohibition on Sharing Material:</span> You agree not to share any music or other material you download from SongPedia with anyone else. Sharing copyrighted material without permission is illegal and can result in civil and criminal liability.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; Ownership of data:</span> All the songs/albums/playlists displayed on this website belong to JioSaavn. We <b>do not intend</b> to infringe on any copyright, trademark, or other intellectual property rights of any third party. All rights to the music and other material available on SongPedia belong to <b>JioSaavn</b> and the respective song labels.</li>
                    <br />
                    <li> <span className='font-bold text-gray-800 dark:text-gray-100'>&#8620; No Piracy:</span> You agree not to use SongPedia to pirate music or engage in any other illegal activity.</li>
                  
                </ul>

                <br/>
                <hr />
                <br />
                <p>By using SongPedia, you <b>agree</b> to comply with these Terms of Use. We reserve the right to modify or update these Terms of Use at any time without notice. If you continue to use SongPedia after any changes to the Terms of Use have been made, you agree to be bound by the revised Terms of Use.</p>
            </div>
        </div>
    )
}

export default Terms
