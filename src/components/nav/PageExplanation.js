import React from 'react';
import PropTypes from 'prop-types';

function PageExplanation(props) {
    const { explanation } = props;

    return (
        <div className="page_explanation">
            {explanation || "페이지 설명사항이 없습니다"}
        </div>
    );
}

PageExplanation.propTypes = {
    explanation: PropTypes.string
};

export default PageExplanation;