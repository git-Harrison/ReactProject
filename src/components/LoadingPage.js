import React, {useState, useEffect} from 'react';
import HashLoader from "react-spinners/HashLoader";

const LoadingPage = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`loading_page ${isFadingOut ? "fadeout" : ""}`}>
            <div className="loading_page_wrap">
                <div>
                    <HashLoader color="#36d7b7"/>
                </div>
                <div>Page Loading..</div>
            </div>
        </div>
    );
}

export default LoadingPage;