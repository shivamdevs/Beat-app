import React from 'react';

interface PropTypes {
    size?: number;
    stroke?: number;
    backStroke?: number;
    duration?: number;
    lineCap?: "inherit" | "round" | "butt" | "square" | undefined;
    color?: string;
    backColor?: string;
};

function LoadSVG({
    size = 20,
    stroke = 8,
    backStroke = 0,
    duration = 2000,
    lineCap = "round",
    color = "dodgerblue",
    backColor = "transparent",
}: PropTypes) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="loadSVG"
            width={size}
            height={size}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                r={50 - (backStroke / 2)}
                stroke={backColor}
                strokeWidth={backStroke}
                fill="none"
            ></circle>
            <circle
                cx="50"
                cy="50"
                r={50 - (stroke / 2)}
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap={lineCap}
                fill="none"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur={`${duration}ms`}
                    values="0 50 50;180 50 50;720 50 50"
                    keyTimes="0;0.5;1"
                ></animateTransform>
                <animate
                    attributeName="stroke-dasharray"
                    repeatCount="indefinite"
                    dur={`${duration}ms`}
                    values="25 250;250 25;25 250"
                    keyTimes="0;0.5;1"
                ></animate>
            </circle>
        </svg>
    );
};

export default LoadSVG;