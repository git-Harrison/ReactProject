import SignLeftBg from "../../../components/member/sign/SignBg";
import SignUpForm from "../../../containers/member/signup/SignUpForm";

function SignUpPage() {
    return (
        <div className="signup">
            <div className="sign">
                <SignLeftBg/>
                <div className="member_bg_box right_bg">
                    <div className="form_text_wrap">
                        <div className="form_text_row">
                            <SignUpForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;