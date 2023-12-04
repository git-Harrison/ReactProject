import React from 'react';
import PasswordInput from "../../../components/input/PasswordInput";
import {setPassWord, setRePassWord} from "../../../redux/actions/SignUpActions";
import {useDispatch, useSelector} from "react-redux";
import InputCheckMsg from "../../../components/input/InputCheckMsg";

function UserPassword() {
    const dispatch = useDispatch();
    const { passWord, rePassWord, passwordError } = useSelector(state => state.signUp);

    return (
        <>
            <PasswordInput
                tagId="signup_password"
                value={passWord}
                onChange={value => dispatch(setPassWord(value))}
                placeholder="password"
                label="Password"
            />
            <PasswordInput
                tagId="signup_re_passWord"
                value={rePassWord}
                onChange={value => dispatch(setRePassWord(value))}
                placeholder="Re-enter Password"
                label="Re-enter Password"
            />
            {passwordError && <InputCheckMsg text={passwordError} />}
        </>
    );
}

export default UserPassword;