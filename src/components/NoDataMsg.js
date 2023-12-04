import PropTypes from 'prop-types';

export function NoDataMsg(props) {
    return (
        <div className={`not_data ${props.className}`}>
            <span className="loading_text not">{props.msg}</span>
        </div>
    );
}

NoDataMsg.propTypes = {
    className: PropTypes.string,
    msg: PropTypes.string.isRequired,
};

export default NoDataMsg;