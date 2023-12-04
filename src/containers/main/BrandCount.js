import Information from "../../components/button/Information";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {MainBrandCount} from "../../services/ReportService";
import {formatNumber} from "../../utill/FormatNumber";
const BrandCount = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseData = await MainBrandCount();
                setData(responseData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentBranch]);

    return (
        <div className="test_components_128 card">
            <div className="card_title_area">
                <h2 className="card_title">Number of brands currently in operation</h2>
                <Information
                    text="The number of brands currently in operation without any account suspension issues."/>
            </div>
            <div className="test_box">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map(item => (
                        <div key={item.channel}>
                            <span>{item.channel}</span>
                            <span>{formatNumber(item.count)}</span>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    )
};
export default BrandCount;