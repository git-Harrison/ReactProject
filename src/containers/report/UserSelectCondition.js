import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReportDataSuccess} from '../../redux/actions/ReportActions';
import {Channels, Stores, TotalStores} from "../../services/ComponentService";
import {Report, ReportTotal} from "../../services/ReportService";
import useSelectedState from "../../hooks/SelectState";
import Select from "../../components/select/BasicSelect";
import Button from "../../components/button/Button";
import DateRangePicker from "../../components/select/DateSelect";
import BasicModal from "../../components/modal/BasicModal";
import StoreSelect from "../../components/select/StoreSelect";

/**
 * 이 파일에서 조건들을 선택 후 API 호출을 하고, 데이터를 리덕스에 저장하는 역할을 함
 */

function UserSelectCondition(props) {
    const {
        selectedChannel,
        selectedStore,
        selectedStartDate,
        selectedEndDate,
        selectedType,
        selectedMonth,
        selectedTimeZone,
        handleChannelChange,
        handleStoreChange,
        handleDateChange,
        handleTypeChange,
        handleTimeZoneChange,
        handleMonthChange,
        apiUrl,
    } = useSelectedState(props.initialValues);

    const dispatch = useDispatch();
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);
    const [channelOptions, setChannelOptions] = useState([]);
    const [storeOptions, setStoreOptions] = useState([]);
    const [isFirstMount, setIsFirstMount] = useState(true);
    const baseDashBoardUrl = process.env.REACT_APP_REPORT_DASHBOARD_API_URL;
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const hasSpecialCharactersOrSpaces = /[^\w]/.test(selectedStore);
    const decodedStore = hasSpecialCharactersOrSpaces ? decodeURIComponent(selectedStore) : selectedStore;


    // 엑셀 임의 데이터 삭제 예정
    const excelChannels = [
        {key: "Amazon", value: 'Amazon'},
        {key: "Shopify", value: 'Shopify'},
    ];

    let excelType;
    if (selectedChannel === "Shopify") {
        excelType = [
            {key: "Transaction Date", value: 'transaction_date'},
        ];
    } else {
        excelType = [
            {key: "Purchase date", value: 'purchase_date'},
            {key: "Posted date", value: 'posted_date'},
            {key: "Delivery date", value: 'estimated_arrival_date'},
        ];
    }

    const excelTimezone = [
        {key: "PST", value: 'PST'},
        {key: "PDT", value: 'PDT'},
    ];

    const excelMonthOptions = [
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


    const closeModal = () => {
        setModalOpen(false);
    };

    // 채널 옵션 가져오기
    const fetchChannels = async () => {
        try {
            const channelData = await Channels();
            const totalOptions = [
                {key: 'All', value: 'All'}
            ];
            const options = totalOptions.concat(channelData.map(channel => ({
                key: channel,
                value: channel
            })));
            setChannelOptions(options);
        } catch (error) {
            console.error('Failed to fetch channels:', error);
        }
    };

    // 스토어 옵션 가져오기
    const fetchStores = async () => {
        try {
            const storeData = await TotalStores();
            const totalOptions = [
                {key: 'All', value: 'All'}
            ];
            const options = totalOptions.concat(storeData.map(store => ({
                key: store,
                value: encodeURIComponent(store)
            })));
            setStoreOptions(options);
        } catch (error) {
            console.error('Failed to fetch stores:', error);
        }
    };

    // 여기서 데일리랑 먼슬리 구분해서 reportApiUrl 를 변경하면 될것 같음, branch 파라미터는 Service 에서 넣어주고 있음
    function getReportApiUrl(pageMode, selectedChannel, selectedStore, selectedStartDate, selectedEndDate) {
        let url;

        switch (pageMode) {
            case 'monthlyChannel':
                return `${baseDashBoardUrl}/order/monthly/channel?channel=${selectedChannel}`;
            case 'monthlyStore':
                return `${baseDashBoardUrl}/order/monthly/store?brand_name=${selectedStore}`;
            case 'dailyChannel':
                return `${baseDashBoardUrl}/order/daily/channel?channel=${selectedChannel}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
            case 'dailyStore':
                return `${baseDashBoardUrl}/order/daily/store?brand_name=${selectedStore}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
            case 'excel':
                url = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/payment-excel/list?channel=${selectedChannel}&merchant_token=${selectedStore}&type=${selectedType}&month=${selectedMonth}`;
                if (selectedChannel === "Amazon") {
                    url += `&timezone=${selectedTimeZone}`;
                }
                break;
            default:
                return "defaultOrErrorUrl";
        }

        return url;
    }

    // API 호출 및 리덕스에 데이터 저장
    const handleClickFetch = async () => {
        props.setLoading(true);

        const reportApiUrl = getReportApiUrl(props.pageMode, selectedChannel, selectedStore, selectedStartDate, selectedEndDate, selectedTimeZone);

        try {
            const responseData = await Report(reportApiUrl);

            if (props.pageMode === 'dailyChannel') {
                const reportTotalApiUrl = `${baseDashBoardUrl}/order/daily-total/channel?channel=${selectedChannel}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
                const responseTotalData = await ReportTotal(reportTotalApiUrl);

                dispatch(fetchReportDataSuccess(responseData, responseTotalData));
            } else if (props.pageMode === 'dailyStore') {
                const reportTotalApiUrl = `${baseDashBoardUrl}/order/daily-total/store?brand_name=${selectedStore}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
                const responseTotalData = await ReportTotal(reportTotalApiUrl);

                dispatch(fetchReportDataSuccess(responseData, responseTotalData));
            } else {
                dispatch(fetchReportDataSuccess(responseData));
            }
        } catch (error) {
            setModalOpen(true);
            setModalMessage('Data not found');
            props.setLoading(false);
        } finally {
            props.setLoading(false);
        }
    };

    // 채널 리스트 초기 로드
    useEffect(() => {
        fetchChannels();
    }, [currentBranch]);

    // 선택된 채널에 따른 스토어 리스트 업데이트
    useEffect(() => {
        fetchStores();
        // 첫 마운트가 아닐 때만 Store 선택 초기화
        if (!isFirstMount) {
            handleStoreChange('');
        } else {
            setIsFirstMount(false); // 첫 마운트 후 상태 업데이트
        }
    }, [currentBranch, selectedChannel]);


    // 이거 지우자
    let excelTypeOptions;
    if (selectedChannel === "Shopify") {
        excelTypeOptions = [
            {key: "Transaction Date", value: 'transaction_date'},
        ];
    } else {
        excelTypeOptions = [
            {key: "Purchase date", value: 'purchase_date'},
            {key: "Posted date", value: 'posted_date'},
            {key: "Delivery date", value: 'estimated_arrival_date'},
        ];
    }

    const excelTimeZoneOptions = [
        {key: "PST", value: 'PST'},
        {key: "PDT", value: 'PDT'},
    ];

    const MonthOptions = [
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

    return (
        <>
            <BasicModal
                isOpen={isModalOpen}
                close={closeModal}
                modalTitle="Error"
                modalText={modalMessage}
            />
            <div className="top_nav">
                {(props.pageMode === 'dailyChannel' || props.pageMode === 'monthlyChannel') && (
                    <Select
                        option={channelOptions}
                        title={selectedChannel || 'Channel'}
                        onSelectChange={handleChannelChange}
                        value={selectedChannel || ''}
                    />
                )}
                {(props.pageMode === 'dailyStore' || props.pageMode === 'monthlyStore') && (
                    <Select
                        option={storeOptions}
                        className="store_select"
                        title={decodedStore || 'Store'}
                        onSelectChange={handleStoreChange}
                        value={selectedStore || ''}
                    />
                )}
                {(props.pageMode === 'dailyChannel' || props.pageMode === 'dailyStore') && (
                    <DateRangePicker
                        onDateChange={handleDateChange}
                        initialStartDate={props.initialValues.startDate}
                        initialEndDate={props.initialValues.endDate}
                    />
                )}
                {props.pageMode === 'excel' && (
                    <>
                        <Select
                            option={excelChannels}
                            title={selectedChannel || 'Channel'}
                            onSelectChange={handleChannelChange}
                            value={selectedChannel || ''}
                        />
                        <StoreSelect pageMode="excel" onSelectChange={handleStoreChange} selectedChannel={selectedChannel}/>
                        <Select
                            option={excelType}
                            title="Type"
                            onSelectChange={handleTypeChange}
                            className="typeSelect"
                        />
                        <Select
                            option={MonthOptions}
                            title="Month"
                            onSelectChange={handleMonthChange}
                        />
                        {selectedChannel === "Amazon" && (
                            <Select
                                option={excelTimeZoneOptions}
                                title="Data Type"
                                onSelectChange={handleTimeZoneChange}
                            />
                        )}
                    </>
                )}
                <Button
                    type="button"
                    className="fetch_btn"
                    label="Request"
                    onClick={handleClickFetch}
                />
            </div>
        </>
    );
}

export default UserSelectCondition;