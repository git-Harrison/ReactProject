// type
export const SET_SIGN_UP_STEP = 'SET_SIGN_UP_STEP';
export const SET_STAGE = 'SET_STAGE';
export const SET_ID = 'SET_ID';
export const SET_DOMAIN = 'SET_DOMAIN';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_RE_PASSWORD = 'SET_RE_PASSWORD';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';
export const SET_FORM_ERROR = 'SET_FORM_ERROR';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_FORM_ERROR_MSG = 'SET_FORM_ERROR_MSG';
export const SET_API_CALLED = 'SET_API_CALLED';
export const SET_INPUT_CHECK = 'SET_INPUT_CHECK';
export const SET_AUTH_CODE = 'SET_AUTH_CODE';
export const SET_BUTTON_LABEL = 'SET_BUTTON_LABEL';
export const SET_CODE_TIMER = 'SET_CODE_TIMER';
export const SET_TIMER_STATE = 'SET_TIMER_STATE';


export const RESET_SIGN_UP_STEP = 'RESET_SIGN_UP_STEP';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_RE_PASSWORD = 'RESET_RE_PASSWORD';
export const RESET_AUTH_CODE = 'RESET_AUTH_CODE';
export const RESET_SIGNUP = 'RESET_SIGNUP';


// Action Creators
export const setSignUpStep = (signUpStep) => ({type: SET_SIGN_UP_STEP, signUpStep});
export const setStage = (stage) => ({type: SET_STAGE, stage});
export const setId = (id) => ({type: SET_ID, id});
export const setDomain = (domain) => ({type: SET_DOMAIN, domain});
export const setPassWord = (passWord) => ({type: SET_PASSWORD, payload: passWord});
export const setRePassWord = (rePassWord) => ({type: SET_RE_PASSWORD, payload: rePassWord});
export const setFormError = (error) => ({type: SET_FORM_ERROR, payload: error});
export const setAuthError = (error) => ({type: SET_AUTH_ERROR, payload: error});
export const setPasswordError = (error) => ({type: SET_PASSWORD_ERROR, payload: error});
export const setFormErrorMsg = (msg) => ({type: SET_FORM_ERROR_MSG, payload: msg});
export const setApiCalled = (apiCalled) => ({type: SET_API_CALLED, payload: apiCalled});
export const setInputCheck = (inputCheck) => ({type: SET_INPUT_CHECK, payload: inputCheck});
export const setAuthCode = (authCode) => ({type: SET_AUTH_CODE, payload: authCode});
export const setButtonLabel = (buttonLabel) => ({type: SET_BUTTON_LABEL, payload: buttonLabel});
export const setCodeTimer = (time) => ({type: SET_CODE_TIMER, payload: time});
export const setTimerState = (state) => ({type: SET_TIMER_STATE, payload: state});

export const resetSignUpStep = () => ({type: RESET_SIGN_UP_STEP});
export const resetPassWord = () => ({type: RESET_PASSWORD});
export const resetRePassWord = () => ({type: RESET_RE_PASSWORD});
export const resetAuthCode = () => ({type: RESET_AUTH_CODE});
export const resetSignUp = () => ({type: RESET_SIGNUP});