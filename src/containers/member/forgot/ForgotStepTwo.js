import {Link} from "react-router-dom";
import Button from "../../../components/button/Button";
import React from "react";

const ForgotStepTwo = () => {
    const navLinks = [
        {
            to: '/signIn',
            label: 'Go to login page',
        },
    ];

    return (
        <>
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <Link to={link.to}>
                            <Button type="button" className="sign_btn" label={link.label} />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ForgotStepTwo;