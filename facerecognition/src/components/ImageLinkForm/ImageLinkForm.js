import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onBtnSubmit}) => {
    return (
        <div>
            <p className='f3 text'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
        <div className='pa4 br3 center shadow-5 col pat-2 form'>
            <input className ='forminput f3 text' type='text' placeholder='Upload photo here...' onChange={onInputChange } /> 
            <button className=' f4 bg-light-purple white btn grow pointer shadow-2' onClick={onBtnSubmit}>Detect</button>
        </div>
    </div>
    );
}

export default ImageLinkForm;