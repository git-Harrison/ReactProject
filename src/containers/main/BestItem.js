import React, {useEffect, useState} from 'react';
import Information from "../../components/button/Information";
import {BestItems} from "../../services/ReportService";
import LoadingMsg from "../../components/LoadingMsg";
import Select from "../../components/select/BasicSelect";
import useSelectedState from "../../hooks/SelectState";
import {useSelector} from "react-redux";
import {formatNumber} from "../../utill/FormatNumber";
import DailyReportTable from "../../components/table/DailyReportTable";
import NoDataMsg from "../../components/NoDataMsg";

const imageUrls = [
    "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/mainpage_bestitem_rank1.png",
    "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/mainpage_bestitem_rank2.png",
    "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/mainpage_bestitem_rank3.png",
    "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/mainpage_bestitem_rank4.png",
    "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/mainpage_bestitem_rank5.png"
];

const BestItem = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataStatus, setDataStatus] = useState(false);
    const {selectedChannel, handleChannelChange} = useSelectedState({channel: 'Amazon'});
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    const getMonthFormatted = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return `${year}-${month.toString().padStart(2, '0')}`;
    };

    const getBaseUrl = (selectedChannel) => {
        switch (selectedChannel) {
            case "Shopify":
                return process.env.REACT_APP_REPORT_SHOPIFY_API_URL;
            case "Tiktokshop":
                return process.env.REACT_APP_REPORT_TIkTOK_API_URL;
            default:
                return process.env.REACT_APP_REPORT_AMAZON_API_URL;
        }
    };

    const fetchBestItems = async () => {
        setLoading(true);
        try {
            const baseUrl = getBaseUrl(selectedChannel);
            const thisMonth = getMonthFormatted();
            const finalApiURL = `${baseUrl}/best-items?month=${thisMonth}`;
            const responseData = await BestItems(finalApiURL);
            const updatedItems = responseData.map((item, index) => ({
                ...item,
                imgSrc: imageUrls[index % imageUrls.length]
            }));

            setDataStatus(true);
            setItems(updatedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDataStatus(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestItems();
    }, [selectedChannel, currentBranch]);

    return (
        <div className="best_item_box card">
            <div className="best_item_top_box">
                <div className="best_item_card_title_box">
                    <div className="best_item_card_title">Top 5 sales from the this month</div>
                    <Information text="The top 5 products for this month based on sales amount"/>
                </div>
                <Select
                    className="select_channel"
                    option={[
                        {key: "Amazon", value: "Amazon"},
                        {key: "Shopify", value: "Shopify"},
                        {key: "Tiktokshop", value: "Tiktokshop"}
                    ]}
                    title={selectedChannel || 'channel'}
                    onSelectChange={handleChannelChange}
                />
            </div>
            {loading ? (
                <LoadingMsg className="table"/>
            ) : (
                dataStatus ? <ul>
                    {items.map((item, index) => (
                        <li className="best_item_list" key={index}>
                            <img className="best_item_img" src={item.imgSrc} alt={item.title}/>
                            <div className="best_item_title_box">
                                <div className="best_item_title" title={item.title}>{item.title}</div>
                                <div className="best_item_sku">{item.sku}</div>
                            </div>
                            <div className="best_item_qty_box">
                                <div className="best_item_qty_title">qty</div>
                                <div className="best_item_qty">{formatNumber(item.qty)}</div>
                            </div>
                            <div className="best_item_amount_box">
                                <div className="best_item_amount_title">amount</div>
                                <div className="best_item_amount">{formatNumber(item.amount)} {item.currency}</div>
                            </div>
                        </li>
                    ))}
                </ul> : <NoDataMsg className="best" msg="No data found"/>
            )}
        </div>
    );
};

export default BestItem;
