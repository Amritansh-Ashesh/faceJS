import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL,box}) => {
    return (
    <div className='center ma2'>
        <div className='absolute ma'>
            <img id='inputimage' src={imageURL}  alt='' width='400px' height='auto'/>
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
        </div>
    </div>
    );
}

export default FaceRecognition;