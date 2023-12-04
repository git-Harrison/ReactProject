import React from 'react';
import {Link} from 'react-router-dom';
import Button from "../../../components/button/Button";
import {useDispatch} from "react-redux";
import {resetSignUp} from '../../../redux/actions/SignUpActions';


const SignUpStepFour = () => {
    const dispatch = useDispatch();

    const navLinks = [
        {
            to: '/signIn',
            label: 'Go to login page',
        },
    ];

    const resetSignUpActions = () => {
        dispatch(resetSignUp());
    }

    return (
        <>
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <Link to={link.to}>
                            <Button type="button" className="sign_btn" label={link.label} onClick={resetSignUpActions}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SignUpStepFour;