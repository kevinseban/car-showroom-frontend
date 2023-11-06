import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import React, { useState } from 'react';

function ImageSlider(props) {

    const [imageIndex, setImageIndex] = useState(0);

    function showNextImage() {
        setImageIndex(index => {
            if (index === props.images.length - 1) return 0
            return index + 1
        })
    }
    function showPreviousImage() {
        setImageIndex(index => {
            if (index === 0) return props.images.length - 1
            return index - 1
        })
    }

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{ width: "100%", height: "100%", overflow: " hidden", display: "flex" }}>
                {props.images.map((image, index) => (
                    <img className='img-slider-img' key={index} src={image.src} alt={image.alt} style={{ transform: `translateX(${-100 * imageIndex}%)` }}
                    />
                ))}
            </div>
            <button onClick={showPreviousImage} className='img-slider-btn' style={{ left: "0" }}><ArrowBigLeft /></button>
            <button onClick={showNextImage} className='img-slider-btn' style={{ right: "0" }}><ArrowBigRight /></button>
        </div>
    )

}

export default ImageSlider;