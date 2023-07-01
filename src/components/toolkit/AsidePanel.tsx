import React from 'react';
import "./ToolkitPanel.scss";
import { MdClearAll } from 'react-icons/md';
import tapTile from "../../assets/images/toolkit/tap-tiles.png";
import Tippy from '@tippyjs/react';

type Panels = null;

function AsidePanel() {
    const [panel, SetPanel] = React.useState<Panels>(null);

    const handleLoad: React.EventHandler<React.SyntheticEvent<HTMLIFrameElement, Event>> = (e) => {
        (e.target as HTMLIFrameElement).style.visibility = "";
    };


    return (
        <aside id="toolkit-panel">
            <section className="displays">
                <iframe
                    style={{ visibility: "hidden" }}
                    title="Memory Game"
                    src="https://sarthak-memory-game.netlify.app/"
                    frameBorder="0"
                    onLoad={handleLoad}
                    data-visible={!!panel}
                    loading="lazy"
                />
            </section>
            <section className="tap-tile">
                <Tippy content="Close" placement="left">
                    <button className="round close-display" onClick={() => SetPanel(null)}>
                        <MdClearAll />
                    </button>
                </Tippy>
                <Tippy content="Memory Game" placement="left">
                    <button type="button" className="round">
                        <img src={tapTile} alt="Memory Game" />
                    </button>
                </Tippy>
            </section>
        </aside>
    );
}

export default AsidePanel;
