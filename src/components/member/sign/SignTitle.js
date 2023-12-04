import PropTypes from "prop-types";

function SignTitle(props) {
    return (
        <div className="sign_title">
            <h2 className="sign_title_text">{props.mainText}</h2>
            <span className="sign_text">{props.subText}</span>
        </div>
    );
}

SignTitle.propTypes = {
    mainText: PropTypes.string,
    subText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default SignTitle;