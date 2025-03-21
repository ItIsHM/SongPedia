import React from 'react';

function Footer(props) {
    return (
        <div className={props.theme}>
            <footer className="text-black dark:text-gray-400 bg-light-100 dark:bg-deep-900 body-font mt-auto">
                <div className="container px-5 py-1 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center dark:text-white text-black mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>

                        <div className="ml-3">
                            <span className="text-xl block">SongPedia</span>
                            <span className="text-xs block">By&nbsp;&nbsp;ꌗ ꓄ ꍏ ꓄ ꀎ ꌗ&nbsp;&nbsp;ꍏ ꋪ ꍟ ꍏ</span>
                        </div>
                    </a>
                    <p className="text-sm text-black dark:text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-0">
                        Made with ♥ by
                        <a href="#" className="text-gray-700 dark:text-gray-500 ml-1" target="_blank"
                            rel="noopener noreferrer">HM</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
