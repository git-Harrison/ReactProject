import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import Dropdown from "../button/DropDown";

function MenuListItem(props) {
    const { title, icon, navLinks, dropdowns } = props;

    return (
        <div className="menu_list_item">
            <h4 className="menu_list_title">{title}</h4>
            <div className="menu_list_area">
                {dropdowns?.map((dropdown, index) => (
                    <Dropdown key={index} title={dropdown.title} icon={icon} options={dropdown.options} />
                ))}
                <nav className="menu_list_nav">
                    {navLinks?.map((navLink, index) => (
                        <NavLink
                            key={index}
                            to={navLink.to}
                            activeclassname="active-link"
                            className="menu_item"
                            onClick={navLink.onClick}
                        >
                            {navLink.icon}
                            <span>{navLink.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}

MenuListItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element,
    navLinks: PropTypes.array,
    dropdowns: PropTypes.array
};

export default MenuListItem;