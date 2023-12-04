import React from 'react';
import Button from "../button/Button";
import PropTypes from 'prop-types';

const DownloadButton = (props) => {
    const { url } = props;
    const handleDownload = () => {
        try {
            window.open(url); // 주어진 URL로 이동하여 파일 다운
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Button type="button" className="download_btn" label="Download" onClick={handleDownload}/>
    );
};

DownloadButton.propTypes = {
    url: PropTypes.string.isRequired
};

export default DownloadButton;