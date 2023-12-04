import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {AiOutlineCaretDown} from "react-icons/ai";

function Dropdown({title, icon, options = [], ...props}) {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴 펼침 / 접힘 상태 관리

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // side_menu_btn 클릭 시 드롭다운 메뉴 펼침 / 접힘
    };

    return (
        <div className="dropdown_item">
            <div className="menu_item dropdown_menu">
                <div className="feather">{icon}</div>
                <AiOutlineCaretDown className={`arrow_down ${isOpen ? 'rotate' : ''}`} id="arrow_down"/>
                <button onClick={toggleDropdown} className="side_menu_btn">{title}</button>
            </div>
            {isOpen && options.map(item => (
                item.navLinks.map(navItem => (
                    <nav key={navItem.to}>
                        <NavLink to={navItem.to} className="dropdown_link">
                            {navItem.icon}
                            <span>{navItem.label}</span>
                        </NavLink>
                    </nav>
                ))
            ))}
        </div>
    );
}

Dropdown.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.element,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            subtitle: PropTypes.string,
            navLinks: PropTypes.arrayOf(
                PropTypes.shape({
                    to: PropTypes.string,
                    label: PropTypes.string,
                    icon: PropTypes.element
                })
            ),
        })
    ),
};

export default Dropdown;