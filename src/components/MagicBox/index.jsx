import React from 'react';
import useMagicColor from '../../hooks/useMagicColor';
import './MagicBox.scss';

function MagicBox() {
    const color = useMagicColor(); // cho mình 1 cái color mới sau mỗi 1s

    return (
        <div className="magic-box"
            style={{ backgroundColor: color }}
        >    
        </div>
    );
}

export default MagicBox;