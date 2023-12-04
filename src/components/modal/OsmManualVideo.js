import React from 'react';
import PropTypes from "prop-types";

const OmsManualVideo = (props) => {
    const { isOpen, close, modalTitle } = props;

    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if(e.target.className === 'modal_wrap'){
            close();
        }
    }

    return (
        <div className="modal_wrap" onClick={handleOutsideClick}>
            <div className="modal">
                <h2 className="modal_title">{modalTitle}</h2>
                <div className="modal_text">
                    <video width="400" height="400" controls autoPlay muted>
                        <source src={process.env.PUBLIC_URL + '/toms.mp4'} type="video/mp4"/>
                    </video>
                </div>
                <div className="modal_button_area">
                    <button type="button" className="close_button" onClick={close}>Close Modal</button>
                </div>
            </div>
        </div>
    );
}


OmsManualVideo.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    modalTitle: PropTypes.string,
};

export default OmsManualVideo;