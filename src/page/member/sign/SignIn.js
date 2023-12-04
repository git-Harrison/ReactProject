import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetSignUp, setPassWord} from "../../../redux/actions/SignUpActions";
import {setCurrentBranch} from '../../../redux/actions/BranchActions';
import {Login} from "../../../services/SignService";
import {EnCrypt} from "../../../services/crypto/CryptoService";
import OmsManualVideo from "../../../components/modal/OsmManualVideo";
import SignLeftBg from "../../../components/member/sign/SignBg";
import PasswordInput from "../../../components/input/PasswordInput";
import Button from "../../../components/button/Button";
import SignEmailForm from "../../../components/member/sign/SignEmailForm";
import BasicModal from "../../../components/modal/BasicModal";

function SignIn() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const dispatch = useDispatch();
    const {
        id, domain, passWord,
    } = useSelector(state => state.signUp);

    const submitLoginRequest = async (e) => {
        e.preventDefault();

        const userId = id + "@" + domain;

        if (!id || !passWord) {
            setModalMessage("Please enter both ID and password.");
            setModalOpen(true);
            return;
        }

        if (!domain) {
            setModalMessage("Please select a domain.");
            setModalOpen(true);
            return;
        }

        try {
            const responseData = await Login(userId, passWord);

            // 로그인 시 로컬스토리지에 저장
            if (responseData && responseData.access_token) {
                let branchValue = responseData.branch;
                if (branchValue === 'KR') {
                    branchValue = 'US';
                }
                const encryptedBranch = branchValue;

                localStorage.setItem('access_token', EnCrypt(responseData.access_token));
                localStorage.setItem('token_expired_at', responseData.token_expired_at);
                localStorage.setItem('userInfoId', EnCrypt(responseData.id));
                localStorage.setItem('userInfoName', EnCrypt(responseData.name));
                localStorage.setItem('userInfoBranch', EnCrypt(responseData.branch));
                localStorage.setItem('userInfoDepartment', EnCrypt(responseData.department));
                localStorage.setItem('userInfoTeam', responseData.team === null ? 'null' : EnCrypt(responseData.team));

                localStorage.setItem('userInfoPosition', EnCrypt(responseData.position));
                localStorage.setItem('userInfoGrant', responseData.grant);
                localStorage.setItem('userInfoStatus', responseData.status);
                dispatch(resetSignUp());
                dispatch(setCurrentBranch(encryptedBranch));

                navigate('/');
            } else {
                setModalMessage("Invalid username or password.");
                setModalOpen(true);
            }
        } catch (error) {
            let errorMessage = "An error occurred during login. Please try again.";

            setModalMessage(errorMessage);
            setModalOpen(true);
        }
    };

    const handleMenualClick = () => {
        setVideoModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setVideoModalOpen(false);
    };

    return (
        <div className="signup">
            <BasicModal
                isOpen={isModalOpen}
                close={closeModal}
                modalTitle="Error"
                modalText={modalMessage}
            />
            <OmsManualVideo isOpen={isVideoModalOpen} close={closeModal} modalTitle="OMS Manual Video"/>
            <div className="sign">
                <SignLeftBg/>
                <div className="member_bg_box right_bg">
                    <div className="form_text_wrap">
                        <div className="form_text_row">
                            <div className="signin_area">
                                <div className="sign_area_box">
                                    <div className="signin_title_area">
                                        <h2 className="signin_title">Welcome to Toms</h2>
                                        <div className="signin_new">
                                            <span className="new_title">New to Toms?</span>
                                            <Link className="go_to_signup" to="/signUp">Create an account</Link>
                                        </div>
                                    </div>
                                    <form>
                                        <SignEmailForm id={id} domain={domain}/>
                                        <PasswordInput type="password" tagId="user_password" name="user_password"
                                                       className="form_text_input" placeholder="Enter password"
                                                       label="Password"
                                                       value={passWord}
                                                       onChange={value => dispatch(setPassWord(value))}
                                        />
                                        <div className="checkbox_and_forgot">
                                            <Link className="go_to_forgot" to="/forgot">Forgot Password?</Link>
                                        </div>
                                        <Button type="submit" className="sign_btn" label="Sign In"
                                                onClick={submitLoginRequest}/>
                                        <Button type="button" className="oms_menual_video" onClick={handleMenualClick}
                                                label="View OMS Guide Video"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;