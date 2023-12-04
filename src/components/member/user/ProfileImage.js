import React from "react";
import {DeCrypt} from "../../../services/crypto/CryptoService";

function ProfileImage(props) {
    const rawValue = localStorage.getItem('userInfoId');
    const userInfoId = rawValue ? DeCrypt(rawValue) : null;

    const getInitials = (name) => {
        return name ? name[0].toUpperCase() : '';
    };

    return (
        <div className={`button_image ${props.className}`} onClick={props.onClick}>
            {getInitials(userInfoId)}
        </div>
    );
}

export default ProfileImage;