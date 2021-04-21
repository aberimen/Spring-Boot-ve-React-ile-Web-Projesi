import React from 'react';

const Spinner = () => {
    return (
        <div className=" d-flex justify-content-center w-100 h-100 align-items-center">
            <div className="spinner-border text-secondary" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;