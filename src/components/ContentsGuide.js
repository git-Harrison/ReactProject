import PropTypes from 'prop-types';

function ContentsGuide(props) {
    const {guideTitle, contentsGuideTitle, contentsExplanation} = props;

    return (
        <>
            <ul className="contents_guide_wrap">
                {guideTitle.map((title, index) => (
                    <li className="contents_guide" key={index}>
                        <h4 className="guide_title">{title}</h4>
                        <div className="contents_row">
                            {contentsGuideTitle[index].map((guideTitle, i) => (
                                <div className="contents" key={i}>
                                    <div className="contents_guide_title">{guideTitle}</div>
                                    <div className="contents_guide_text">
                                        {contentsExplanation[index][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

ContentsGuide.propTypes = {
    pageMode: PropTypes.string.isRequired,
    guideTitle: PropTypes.array,
    contentsGuideTitle: PropTypes.array,
    contentsExplanation: PropTypes.array,
};

export default ContentsGuide;