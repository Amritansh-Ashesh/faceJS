import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
                <Tilt className='Tilt br2 shadow-2' options={{max : 80 }} style={{height: 120, width: 120 }} >
                <div className='Tilt-inner pa3'><img  src={brain} alt="Icon"/></div>
                <div className='tc f2 text'>faceJS</div>
                </Tilt>
        </div>
    )
}

export default Logo;