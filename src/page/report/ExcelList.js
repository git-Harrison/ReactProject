import React, {useContext, useEffect} from 'react';
import OrderReport from "../../containers/report/OrderReport";
import useSelectedState from "../../hooks/SelectState";
import StoreSelect from "../../components/select/StoreSelect";
import DownloadButton from "../../components/button/ExcelDownBtn";
import ContentsGuide from "../../components/ContentsGuide";
import {MessageContext} from "../../contexts/MessageContext";

export const ExcelList = () => {
    const { setExplanation } = useContext(MessageContext);
    const selectedState = useSelectedState(); // 선택된 상태 관리

    const columns = React.useMemo(
        () => [
            { Header: 'Store', accessor: 'brand_name' },
            { Header: 'Type', accessor: 'type' },
            ...(selectedState.selectedChannel !== "Shopify" ? [{ Header: 'Timezone', accessor: 'timezone' }] : []),
            { Header: 'Month', accessor: 'month' },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ cell }) => {
                    const filePath = cell.row.original.file_path;
                    if (filePath === 'failed') {
                        return 'failed';
                    } else if (filePath === null) {
                        return 'In progress';
                    } else {
                        return <DownloadButton url={filePath} />;
                    }
                },
            },
        ],
        [selectedState.selectedChannel]
    );

    const channels = [
        {key: "Amazon", value: 'Amazon'},
        {key: "Shopify", value: 'Shopify'},
    ];

    let type;
    if (selectedState.selectedChannel === "Shopify") {
        type = [
            {key: "Transaction Date", value: 'transaction_date'},
        ];
    } else {
        type = [
            {key: "Purchase date", value: 'purchase_date'},
            {key: "Posted date", value: 'posted_date'},
            {key: "Delivery date", value: 'estimated_arrival_date'},
        ];
    }

    const timezone = [
        {key: "PST", value: 'PST'},
        {key: "PDT", value: 'PDT'},
    ];

    const monthOptions = [
        {key: "2023-10", value: '2023-10'},
        {key: "2023-09", value: '2023-09'},
        {key: "2023-08", value: '2023-08'},
        {key: "2023-07", value: '2023-07'},
        {key: "2023-06", value: '2023-06'},
        {key: "2023-05", value: '2023-05'},
        {key: "2023-04", value: '2023-04'},
        {key: "2023-03", value: '2023-03'},
        {key: "2023-02", value: '2023-02'},
        {key: "2023-01", value: '2023-01'},
        // {key: "2023-11", value: '2023-11'},
        // {key: "2023-12", value: '2023-12'},
    ];

    const initialApiURL = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/payment-excel/list`;

    const guideTitle = ["Type", "Date Type", "Status"];
    const contentsGuideTitle = [
        ["Purchase date", "Posted date", "Delivery date"],
        ["PST", "PDT"],
        // ["PST"],
        ["In progress", "Download", "Failed"],
    ];
    const contentsExplanation = [
        [
            ": 결제일 기준",
            <div className="line_height">
                : 출고일 (이벤트 발생일) 기준
                <br/>
                주문번호 없는 여러가지 Fee 포함
            </div>,
            ": 배송 도착 예정일",
        ],
        [
            <div className="line_height">
                : 태평양 표준시
                <br/>
                Pacific Standard Time = UTC-08:00
            </div>,
            <div className="line_height">
                : 태평양 일광 절약시간
                <br/>
                Pacific Daylight Time = UTC-07:00
            </div>,
        ],
        [": 파일 생성중", ": 다운 가능한 상태", ": 파일 생성 실패"],
    ];

    const noticeMsg = "* This is the page where you can download accounting Excel data for closing processes. Please note that the time reference is available only in PST (Pacific Standard Time)\n"

    useEffect(() => {
        setExplanation(noticeMsg);
    }, []);

    const defaultChannel = "Channel";
    const defaultStore = "Store";

    const initialSelect = {
        channel: defaultChannel,
        store: defaultStore
    };

    return (
        <>
            <OrderReport
                pageMode="excel"
                columns={columns}
                initialApiURL={initialApiURL}
                channelOptions={channels}
                storeSelect={<StoreSelect pageMode="excel" onSelectChange={selectedState.handleStoreChange} initialSelect={initialSelect} apiUrl={selectedState.apiUrl}/>}
                timeZoneOptions={timezone}
                typeOptions={type}
                monthOptions={monthOptions}
                selectedState={selectedState}
                initialSelect={initialSelect}
            />
            <ContentsGuide pageMode="excel" guideTitle={guideTitle} contentsGuideTitle={contentsGuideTitle}
                           contentsExplanation={contentsExplanation}/>
        </>
    );
}
export default ExcelList;