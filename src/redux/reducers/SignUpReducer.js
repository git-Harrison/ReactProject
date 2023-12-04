import {
    SET_SIGN_UP_STEP,
    SET_STAGE,
    SET_ID,
    SET_DOMAIN,
    SET_PASSWORD,
    SET_RE_PASSWORD,
    SET_FORM_ERROR,
    SET_AUTH_ERROR,
    SET_PASSWORD_ERROR,
    SET_FORM_ERROR_MSG,
    SET_API_CALLED,
    SET_INPUT_CHECK,
    SET_AUTH_CODE,
    SET_BUTTON_LABEL,
    SET_CODE_TIMER,
    SET_TIMER_STATE,
    RESET_SIGN_UP_STEP,
    RESET_PASSWORD,
    RESET_RE_PASSWORD,
    RESET_AUTH_CODE,
    RESET_SIGNUP,
} from '../actions/SignUpActions';

const initialState = {
    signUpStep: 1,
    stage: 1,
    id: '',
    domain:'',
    passWord: '',
    rePassword: '',
    formError: false,
    formErrorMsg: '',
    authError: false,
    passwordError: '',
    inputCheck: false,
    apiCalled: false,
    authCode: '',
    buttonLabel: 'Get Authentication',
    codeTimer: 180,
    timerState: false,
};

export default function signUpReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SIGN_UP_STEP:
            return { ...state, signUpStep: action.signUpStep };
        case SET_STAGE:
            return { ...state, stage: action.stage };
        case SET_ID:
            return { ...state, id: action.id };
        case SET_DOMAIN:
            return { ...state, domain: action.domain };
        case SET_PASSWORD:
            return { ...state, passWord: action.payload };
        case SET_RE_PASSWORD:
            return { ...state, rePassWord: action.payload };
        case SET_FORM_ERROR:
            return { ...state, formError: action.payload };
        case SET_AUTH_ERROR:
            return { ...state, authError: action.payload };
        case SET_PASSWORD_ERROR:
            return { ...state, passwordError: action.payload };
        case SET_FORM_ERROR_MSG:
            return { ...state, formErrorMsg: action.payload };
        case SET_API_CALLED:
            return { ...state, apiCalled: action.payload };
        case SET_INPUT_CHECK:
            return { ...state, inputCheck: action.payload };
        case SET_AUTH_CODE:
            return { ...state, authCode: action.payload };
        case SET_BUTTON_LABEL:
            return { ...state, buttonLabel: action.payload };
        case SET_CODE_TIMER:
            return { ...state, codeTimer: action.payload };
        case SET_TIMER_STATE:
            return { ...state, timerState: action.payload };
        case RESET_SIGN_UP_STEP:
            return { ...state, signUpStep: initialState.signUpStep };
        case RESET_PASSWORD:
            return { ...state, passWord: initialState.passWord };
        case RESET_RE_PASSWORD:
            return { ...state, rePassword: initialState.rePassword };
        case RESET_AUTH_CODE:
            return { ...state, authCode: initialState.authCode };
        case RESET_SIGNUP:
            return initialState;
        default:
            return state;
    }
}