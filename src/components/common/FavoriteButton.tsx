import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { MdFavoriteBorder } from 'react-icons/md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

function FavoriteButton({ className, ...props }: ButtonProps) {
    return (
        <Tippy content="Add to Favorites">
            <button type="button" className={classNames("round", className)} {...props}>
                <MdFavoriteBorder />
            </button>
        </Tippy>
    );
}

export default FavoriteButton
