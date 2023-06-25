import React from 'react';
import "./SidePanel.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../core/app/AppContext';

function SidePanel() {
    const { user, state: { loading } } = useAppContext();

    return (
        <aside id="side-panel">
            <div className="title">Browse</div>
            <NavBtn to="/" name="Home" />
            <NavBtn to="/trending" name="Trending Today" />
            <NavBtn to="/releases" name="New Releases" />
            <NavBtn to="/playlists" name="Playlists" />
            <NavBtn to="/charts" name="Top Charts" />

            <div className="title">Library</div>
            <NavBtn to="/u/favorites" name="Favorites" />
            <NavBtn name="New Playlist" />

            <div className="title">Your Playlists</div>
            {loading && <div className="add-play">Loading...</div>}
            {!loading && user && <div className="add-play">You don't have any playlist yet.<br />Create a new one!</div>}
            {!loading && !user && <div className="add-play">Connect your account to create playlists.</div>}

            {/* {userCDbPlayLists?.map((list, index) => <NavBtn key={`${list?.id}${index}`} to={`/playlists/up/${list.id}`} name={list.name} />)}
                {!userCDbPlayLists?.length && <div className="add-play">You don't have any playlist yet.<br />Create a new one!</div>} */}
        </aside>
    );
}

export default SidePanel;

function NavBtn({ name, to, onClick }: { name: string, to?: string, onClick?: () => void }) {
    const navigate = useNavigate();
    const location = useLocation();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (btnRef.current) {
            if (location.pathname === to) {
                btnRef.current.classList.add('active');
            } else {
                btnRef.current.classList.remove('active');
            }
        }
    }, [location.pathname, to]);
    return (
        <button type="button" ref={btnRef} className='bs-link' onClick={() => onClick?.() || (to && navigate(to))}>{name}</button>
    );
}