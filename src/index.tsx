import React from 'react';
import ReactDOM from 'react-dom/client';
import OasisMenuProvider from 'oasismenu';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import "./styles/index.scss";
import Wrap from './layout/Wrap';
import "oasismenu/themes/space.css";
import { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';


tippy.setDefaultProps({
    arrow: false,
    animation: "shift-away",
    delay: [200, 0],
    theme: 'tippy-theme',
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <OasisMenuProvider theme="space" toggle trigger="click">
                <Wrap />
            </OasisMenuProvider>
            <Toaster position="bottom-center" reverseOrder containerStyle={{ top: 76, bottom: 116 }} />
        </BrowserRouter>
    </React.StrictMode>
);
