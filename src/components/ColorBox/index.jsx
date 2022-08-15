import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {
    
};

const getRandomColor = () => {
    const colorList = ['green', 'yellow', 'orange', 'violet', 'deeppink']
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
}


function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('Box-color') || 'deeppink';
        console.log(initColor);
        return initColor;
    });
    
    const handleClick = () => {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('Box-color', newColor);
    }

    return (
        <div className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleClick}>
            Color-Box
        </div>
    );
}

export default ColorBox;