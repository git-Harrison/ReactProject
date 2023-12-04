import GridLoader from "react-spinners/GridLoader";

export function LoadingMsg(props) {
    return (
        <div className={`loading_msg ${props.className}`}>
            <div>
                <div className="img">
                    <GridLoader className="loading_icon" color={`var(--color-mode-color)`} size={10}/>
                </div>
                <span className="loading_text">In progress...</span>
            </div>
        </div>
    );
}

export default LoadingMsg;