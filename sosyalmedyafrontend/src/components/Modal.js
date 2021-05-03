import React from 'react';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {

    const { visible, onClickCancel, onClickOk, message, pendingApiCall } = props;

    let className = 'modal fade';
    if (visible) {
        className += ' show d-block';
    }
    return (
        <div>
            <div className={className} style={{ backgroundColor: "#0000008b" }}>
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Delete Post</h5>
                        </div>
                        <div className="modal-body"> {message} </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClickCancel} disabled = {pendingApiCall} >Cancel</button>
                            <ButtonWithProgress 
                            text = "Delete Post"
                            pendingApiCall = {pendingApiCall}
                            disabled = {pendingApiCall}
                            className="btn btn-danger"
                            onClick={onClickOk}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;