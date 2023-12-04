import {Link} from "react-router-dom";
import {resetSignUp} from "../../../redux/actions/SignUpActions";
import {useDispatch} from "react-redux";

function SignLeftBg() {
    const dispatch = useDispatch();

    const resetSignUpActions = () => {
        dispatch(resetSignUp());
    }

    return (
        <div className="member_bg_box left_bg">
            <div className="logo">
                <Link className="go_to" to="/" onClick={resetSignUpActions}>
                    <img className="logo_img"
                         src={process.env.PUBLIC_URL + '/logo5.png'}
                         alt="logo"/>
                    <span className="logo_text">OMS</span>
                </Link>
            </div>
            <div className="bg">
                <img src={process.env.PUBLIC_URL + '/login-bg.svg'}
                     alt="member_bg_image"/>
            </div>
        </div>
    );
}

export default SignLeftBg;