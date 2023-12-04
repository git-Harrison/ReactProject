import React, { useState } from "react";
import {IoMdInformationCircleOutline} from "react-icons/io";
import PropTypes from "prop-types";

function Information (props) {
    const { text } = props;
    const [showTextBox, setShowTextBox] = useState(false);

    const handleMouseEnter = () => {
        setShowTextBox(true);
    };

    const handleMouseLeave = () => {
        setShowTextBox(false);
    };

    return (
        <>
            <div className="information_box">
                <div className={`information_text_box ${showTextBox ? "show" : "hide"}`}>
                    <div className="information_text">{text}</div>
                </div>
                <IoMdInformationCircleOutline className="information_icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            </div>
        </>
    )
}

Information.propTypes = {
    text: PropTypes.string,
}

export default Information;