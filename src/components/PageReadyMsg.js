export function PageReadyMsg(props) {
    const {title, subtitle} = props;

    return (
        <div className="page_ready_wrap">
            <div className="page_ready_row">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p></p>
            </div>
        </div>
    );
}

export default PageReadyMsg;