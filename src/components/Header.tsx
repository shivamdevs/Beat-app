import React from 'react';
import "./Header.scss";
import { IoMdSearch } from 'react-icons/io';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppContext } from '../core/app/AppContext';
import { OasisMenu, OasisMenuBreak, OasisMenuItem, OasisMenuTrigger } from 'oasismenu';
import Tippy from '@tippyjs/react';
import { MdFavorite, MdManageAccounts, MdOutlineLogout } from 'react-icons/md';
import { TbPlaylist } from 'react-icons/tb';

function Header() {
    const navigate = useNavigate();
    const { user, state: { loading }, dialog: { $set: { account } } } = useAppContext();


    return (
        <header id="header">
            <div className="logo">
                LOGO
            </div>
            <div className="flex-fill" data-flex={1} />
            <Routes>
                <Route path="/search" element={null} />
                <Route path="*" element={<div className="search">
                    <button type="button" className="search-box" onClick={() => navigate("/search")}>
                        <IoMdSearch />
                        <span>Search...</span>
                        <kbd>/</kbd>
                    </button>
                </div>} />
            </Routes>
            <div className="flex-fill" data-flex={5} />
            <div className="languages">
                Languages
            </div>
            <div className="user-area">
                {!loading && user && <>
                    <OasisMenuTrigger name="headerUserMenu" placement="bottom-right">
                        <Tippy content={user.name}>
                            <button className="user" type="button">
                                <img src={user.photo} alt={user.name} />
                            </button>
                        </Tippy>
                    </OasisMenuTrigger>
                    <OasisMenu name="headerUserMenu">
                        <div className="user-profile-menu">
                            <div className="image">
                                <img src={user.photo} alt={user.name} />
                            </div>
                            <div className="data">
                                <div className="name">{user.name}</div>
                                <div className="email">{user.email}</div>
                            </div>
                        </div>
                        <OasisMenuBreak />
                        <OasisMenuItem icon={<MdManageAccounts />} content="My Account" />
                        <OasisMenuItem icon={<MdFavorite />} content="My Favorites" />
                        <OasisMenuItem icon={<TbPlaylist />} content="My Playlists" />
                        <OasisMenuBreak />
                        <OasisMenuItem onClick={user.logout} icon={<MdOutlineLogout />} content="Logout" />
                    </OasisMenu>
                </>}
                {!loading && !user && <button type="button" onClick={() => account(true)} className="login">Login</button>}
            </div>
        </header>
    );
}

export default Header;
