import PropTypes from 'prop-types';

export function Notice(props) {
    return (
        <div className="notice_wrap">
            <span className="notice_msg">{props.noticeMsg}</span>
        </div>
    );
}

Notice.propTypes = {
    className: PropTypes.string,
    noticeMsg: PropTypes.string.isRequired,
};

export default Notice;