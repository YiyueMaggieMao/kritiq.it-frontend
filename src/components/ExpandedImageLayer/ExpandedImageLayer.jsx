import React from 'react';
import './ExpandedImageLayer.css';

const ExpandedImageLayer = (props) => {
    const {collapseImage} = props;

    return(<div className="expanded-image-background">
        <div className="close-image-button" onClick={collapseImage}><span>x</span></div>
        <div className="image-body"></div>
    </div>)
}

export default ExpandedImageLayer;