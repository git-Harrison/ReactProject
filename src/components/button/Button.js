import React from 'react';
import PropTypes from 'prop-types';
import {AiOutlineSetting} from 'react-icons/ai';
import {BiMenu} from 'react-icons/bi';
import {FaBook} from 'react-icons/fa';
import ProfileImage from "../member/user/ProfileImage";

const Button = (props) => {
    const {type, className, onClick, label, title} = props;

    const renderButtonContent = () => {
        if (label === 'settings_btn') {
            return <AiOutlineSetting/>;
        } else if (label === 'image_btn') {
            return (
                // <img
                //     className="button_image"
                //     src="https://demos.wrappixel.com/premium-admin-templates/angular/flexy-angular/dark/assets/images/users/user2.jpg"
                //     alt="Profile"
                // />
                <ProfileImage/>
            );
        } else if (label === 'menu_btn') {
            return <BiMenu/>;
        } else if (label === 'memo_btn') {
            return <FaBook/>;
        } else if (label === 'test_btn') {
            return <FaBook/>;
        } else {
            return label;
        }
    };

    return (
        <button type={type} className={className} onClick={onClick} title={title}>
            {renderButtonContent()}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default Button;