import SignLeftBg from "../../../components/member/sign/SignBg";
import ForgotForm from "../../../containers/member/forgot/ForgotForm";

function Forgot() {
    return (
        <div className="signup">
            <div className="sign">
                <SignLeftBg/>
                <div className="member_bg_box right_bg">
                    <div className="form_text_wrap">
                        <div className="form_text_row">
                            <ForgotForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;