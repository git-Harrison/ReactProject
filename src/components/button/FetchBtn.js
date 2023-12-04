import {useState} from 'react';
import Button from "./Button";
import PropTypes from 'prop-types';

function FetchButton(props) {
    const { fetchData, pageMode } = props;
    const [loading, setLoading] = useState(false); // 데이터를 가져오기 전 로딩 상태 관리

    const handleClick = () => {
        setLoading(true); // 로딩 상태 true 설정(버튼 비활성화)
        fetchData(pageMode)
    };

    return (
        <>
            <Button
                type="button"
                className="fetch_btn"
                label="Request"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? 'In Process...' : 'Fetch Data'}
            </Button>
        </>
    );
}

FetchButton.propTypes = {
    fetchData: PropTypes.func.isRequired,
    pageMode: PropTypes.string
};

export default FetchButton;