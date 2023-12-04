import React, {useState} from "react";
import Button from "../button/Button";
import BasicModal from "../modal/BasicModal";
import {useDispatch, useSelector} from "react-redux";
import {setTimerState, setCodeTimer} from "../../redux/actions/SignUpActions";
import PropTypes from 'prop-types';

// 이컴포넌트는 로그인 + 회원가입 까지만 사용하시죠 효리씨ㅋㅋ 만들다보니 기능이 너무 많아짐
function FormTextInput(props) {
    const {
        type,
        tagId,
        name,
        className,
        placeholder,
        onChange,
        label,
        wrapperClassName,
        maxLength,
        value: initialValue,
        disabled
    } = props;

    const dispatch = useDispatch();
    const INITIAL_CODE_TIMER_VALUE = 180;
    const {
        id, domain, timerState, codeTimer
    } = useSelector(state => state.signUp);

    const [inputValue, setInputValue] = useState(initialValue  || '');
    const [reRequestState, setReRequestState] = React.useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    // 영어랑 숫자만 입력 가능, 띄어쓰기 금지
    const handleInput = (event) => {
        let value = event.target.value;

        if (wrapperClassName === "birthdayChange") {
            value = value.replace(/[^0-9]/g, '');
        } else if (wrapperClassName === "fullNameChangeUS") {
            value = value.replace(/[^A-Za-z\s]/g, "");
        } else if (wrapperClassName === "fullNameChangeKR") {
            value = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '');
        } else {
            const regex = /^[a-zA-Z0-9\s\S]*$/;
            if (!regex.test(value)) {
                value = value.replace(/[^a-zA-Z0-9\s\S]/g, '');
            }
        }

        setInputValue(value);
        onChange && onChange(event);
    };

    const reRequestfetch = async () => {
        try {
            dispatch(setTimerState(false));
            dispatch(setCodeTimer(INITIAL_CODE_TIMER_VALUE));
            const formData = new FormData();
            formData.append('stage', '1');
            formData.append('id', `${id}@${domain}`);

            // console.log(Array.from(formData.entries()));

            await fetch(`${process.env.REACT_APP_OMS_API_URL}/auth/register`, {
                method: 'POST',
                headers: {'authorization': process.env.REACT_APP_AUTHORIZATION_KEY},
                body: formData
            });

            dispatch(setTimerState(true));

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleReRequest = () => {
        if (!timerState && codeTimer === 0) {
            reRequestfetch();
            setReRequestState(true);
        } else {
            setReRequestState(false);
            setModalOpen(true);
            setModalMessage('Time has not passed');
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {!reRequestState && (
                <BasicModal
                    isOpen={isModalOpen}
                    close={closeModal}
                    modalTitle="Alert"
                    modalText={modalMessage}
                />
            )}

            <div className={`form ${wrapperClassName}`}>
                <input
                    type={type}
                    id={tagId}
                    name={name}
                    className={className}
                    placeholder={placeholder}
                    autoComplete="off"
                    onChange={handleInput}
                    maxLength={maxLength}
                    value={inputValue}
                    disabled={disabled}
                />
                <label htmlFor={tagId} className="form_text_label">{label || 'Default Label'}</label>
                {wrapperClassName === "re_request" && (
                    <>
                        {timerState && <div className="authentication_timer">
                            {Math.floor(codeTimer / 60).toString().padStart(2, '0')}:{(codeTimer % 60).toString().padStart(2, '0')}
                        </div>}
                        <Button
                            type="button"
                            className="re_request_btn"
                            onClick={handleReRequest}
                            label="Re-request"
                        />
                    </>
                )}
            </div>
        </>
    );
}

FormTextInput.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    wrapperClassName: PropTypes.string,
};

export default FormTextInput;