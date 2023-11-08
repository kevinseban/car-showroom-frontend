import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import React, { useState } from 'react';

function ImageSlider(props) {
    const [imageIndex, setImageIndex] = useState(0);
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);
    const [enlargedIndex, setEnlargedIndex] = useState(0);

    function showNextImage() {
        setImageIndex((index) => {
            if (index === props.images.length - 1) return 0;
            return index + 1;
        });
    }

    function showPreviousImage() {
        setImageIndex((index) => {
            if (index === 0) return props.images.length - 1;
            return index - 1;
        });
    }

    const requireImage = (path) => {
        try {
            return require(`./cars/${path}`);
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    const openImageEnlargement = (index) => {
        setEnlargedIndex(index);
        setIsImageEnlarged(true);
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex' }}>
                {props.images.map((imagePath, index) => {
                    const image = requireImage(imagePath);
                    if (image) {
                        return (
                            <img
                                className='img-slider-img'
                                key={index}
                                src={image}
                                alt={`Car ${index + 1}`}
                                style={{ transform: `translateX(${-100 * imageIndex}%)` }}
                                onClick={() => openImageEnlargement(index)}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <button onClick={showPreviousImage} className='img-slider-btn' style={{ left: '0' }}>
                <ArrowBigLeft />
            </button>
            <button onClick={showNextImage} className='img-slider-btn' style={{ right: '0' }}>
                <ArrowBigRight />
            </button>

            {isImageEnlarged && (
                <div className='image-enlargement'>
                    <button className='close-button fw-bold' onClick={() => setIsImageEnlarged(false)}>X</button>
                    <img
                        src={requireImage(props.images[enlargedIndex])}
                        alt={`Car ${enlargedIndex + 1}`}
                        onClick={() => setIsImageEnlarged(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageSlider;
