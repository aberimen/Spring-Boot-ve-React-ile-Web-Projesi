import React from 'react';
import './ImageAttachment.css'

const ImageAttachment = ({ image, pending , onClickCloseImage}) => {
  

    if (image) {
        return (
            <div>
                <div id="image_attachment" className="image-container">
                    <button type="button"
                        className="close close-image-button"
                        aria-label="Close"
                        onClick={onClickCloseImage}
                        disabled={pending}>
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <img className="img-fluid img-thumbnail" src={image} />

                    <div className="overlay" style={{ opacity: pending ? 1 : 0 }}>
                        <div className="d-flex h-100">
                            <div className="spinner-border spinner" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    } else {
        return <> </>

    }
};

export default ImageAttachment;