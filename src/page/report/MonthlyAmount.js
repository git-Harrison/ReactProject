import React, {useContext, useEffect} from 'react';
import StoreSelect from "../../components/select/StoreSelect";
import OrderReport from '../../containers/report/OrderReport';
import useSelectedState from '../../hooks/SelectState';
import {MessageContext} from '../../contexts/MessageContext';

const createColumns = (months) => {
    const headers = months.map((month) => ({
        Header: month,
        accessor: (data) => {
            const { orders, payment, netIncome } = data.sales[month];
            return `${orders}\n${payment}\n${netIncome}`; // 개별 속성 값을 개행문자로 구분하여 반환
        },
        Cell: ({ cell }) => {
            const values = cell.value.split('\n'); // 개행문자로 구분된 값을 배열로 분리
            return (
                <div className="monthly_type_all">
                    {values.map((value, index) => (
                        <div key={index} className={`${month} type_${index}`}>
                            {typeof value === 'string' ? parseFloat(value).toLocaleString() : value}
                        </div> // 개별 값을 각각의 div로 표시
                    ))}
                </div>
            );
        },
    }));

    return [
        {
            Header: 'Channel',
            accessor: 'channel',
            Cell: ({cell}) => {
                if (cell.value === 'Amazon') {
                    return <img src="/amazon_logo.png" alt="Amazon Logo"/>;
                } else if (cell.value === 'Shopify') {
                    return <img src="/shopify_icon.png" alt="Shopify Logo" />;
                } else if (cell.value === 'Tiktokshop') {
                    return <img src="/tiktokshop_icon.png" alt="TiktokShop Logo" />;
                }

                return cell.value;
            },
        },
        ...headers,
    ];
};

export const MonthlyAmount = () => {
    const { setExplanation } = useContext(MessageContext);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const columns = createColumns(months);
    const channels = [
        {key: "Amazon", value: "Amazon"},
        {key: "Shopify", value: "Shopify"},
        {key: "Tiktokshop", value: "Tiktokshop"}
    ];
    const initialApiURL = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderMonthly?channel=Amazon&merchant_token=null`; // 초기 API URL 설정
    const shopifyInitialApiURL = `${process.env.REACT_APP_REPORT_SHOPIFY_API_URL}/orderMonthly?channel=Shopify&merchant_token=null`; // 월별 페이지 수정 부분 ( 초기 쇼피파이 API URL )
    const tiktokInitialApiURL = `${process.env.REACT_APP_REPORT_TIkTOK_API_URL}/orderMonthly?channel=Tiktokshop&merchant_token=null`; // 월별 페이지 수정 부분 ( 초기 틱톡 API URL )
    const selectedState = useSelectedState(); // 선택된 상태 관리
    const noticeMsg = `* Review monthly sales reports, and try using channel and brand filters`;
    const noticeMonthly = ` 'Payment' basis: Based on the amount paid by the customer (shipped)`;
    const noticeMonthly2 = " 'Net income' basis: Excluding all Amazon fees, such as warehousing costs, but not excluding the cost of goods. (Data availability may increase once CMS integration is implemented)"

    useEffect(() => {
        setExplanation(
            <div>
                {noticeMsg}
                <br />
                <div className="notice_monthly">
                    {noticeMonthly}
                    <br></br>
                    {noticeMonthly2}
                </div>
            </div>
        );
    }, []);

    const defaultChannel = "Amazon";
    const defaultStore = "Channel Total";

    const initialSelect = {
        channel: defaultChannel,
        store: defaultStore
    };

    return (
        <>
            <OrderReport
                pageMode="monthly"
                columns={columns}
                storeSelect={<StoreSelect onSelectChange={selectedState.handleStoreChange} initialSelect={initialSelect} apiUrl={selectedState.apiUrl}/>}
                initialApiURL={initialApiURL}
                shopifyInitialApiURL={shopifyInitialApiURL}
                tiktokInitialApiURL={tiktokInitialApiURL}
                channelOptions={channels}
                selectedState={selectedState}
                initialSelect={initialSelect}
            />
        </>
    );
};

export default MonthlyAmount;