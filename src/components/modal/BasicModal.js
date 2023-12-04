import React from 'react';
import PropTypes from "prop-types";

const BasicModal = (props) => {
    const { isOpen, close, modalTitle, modalText, approveBtn, rejectBtn } = props;

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
                <div className="modal_text">{modalText}</div>
                <div className="modal_button_area">
                    {modalTitle === "Delete" && <button type="button" className="delete_button">Delete</button>}
                    {modalTitle === "Reject" && <button className="delete_button" onClick={() => rejectBtn()}>Reject</button>}
                    {modalTitle === "Approve" && <button type="button" className="approve_button" onClick={approveBtn}>Approve</button>}
                    <button type="button"  className="close_button" onClick={close}>Close Modal</button>
                </div>
            </div>
        </div>
    );
}


BasicModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    modalTitle: PropTypes.string,
    modalText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    approveBtn: PropTypes.func,
    rejectBtn: PropTypes.func
};

export default BasicModal;