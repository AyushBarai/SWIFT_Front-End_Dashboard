import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '../assets/Logo.png';
import Link from './Link';
import { SelectedPage } from '../shared/types';
import useMediaQuery from '../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/api';

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const flexBetween = 'flex items-center justify-between';
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const navbarBackground = isTopOfPage ? '' : 'bg-slate-800 drop-shadow';
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null); // Ref for the modal element

    useEffect(() => {
        const getUser = async () => {
            const users = await fetchUsers();
            setUser(users[0]);
            setLoading(false);
        };
        getUser();
    }, []);

    useEffect(() => {
        // Function to close the menu when user clicks outside of it
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsMenuToggled(false);
            }
        };

        // Add event listener when menu is toggled
        if (isMenuToggled) {
            document.addEventListener('mousemove', handleClickOutside);
        }

        // Clean up event listener
        return () => {
            document.removeEventListener('mousemove', handleClickOutside);
        };
    }, [isMenuToggled]);

    return (
        <nav>
            <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6 border-b-2 border-gray-800 mb-2`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        {/* LEFT SIDE */}
                        <a href="/" onClick={() => navigate('/')}>
                            <img alt="logo" src={Logo} />
                        </a>

                        {/* RIGHT SIDE */}
                        {isAboveMediumScreens ? (
                            <div className={`${flexBetween} w-full text-green-500 font-bold`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    <Link
                                        page={SelectedPage.Dashboard}
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <Link
                                        page={SelectedPage.Profile}
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                </div>
                                <div className={`${flexBetween} gap-2 items-center`} onClick={() => navigate('/profile')}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-8 h-8 cursor-pointer"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <p>{loading ? 'Sign in...' : user?.name}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="rounded-full bg-secondary-500 p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                            >
                                <Bars3Icon className="h-6 w-6 text-white" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE MENU MODAL */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div ref={modalRef} className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-slate-300 drop-shadow-xl">
                    {/* CLOSE ICON */}
                    <div className="flex justify-end p-12">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-6 w-6 text-green-500" />
                        </button>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                        <Link
                            page={SelectedPage.Dashboard}
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <Link
                            page={SelectedPage.Profile}
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                    </div>

                    {/* User Name and SVG Icon at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 mb-8 mx-auto flex flex-col items-center text-2xl">
                        <div className={`${flexBetween} gap-2 items-center`} onClick={() => navigate('/profile')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-8 h-8 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <p>{loading ? 'Sign in...' : user?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
