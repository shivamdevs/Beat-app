import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { MdFavoriteBorder } from 'react-icons/md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

function FavoriteButton({ className, ...props }: ButtonProps) {
    return (
        <button type="button" className={classNames("round", className)} {...props}>
            <MdFavoriteBorder />
        </button>
    );
}

export default FavoriteButton
