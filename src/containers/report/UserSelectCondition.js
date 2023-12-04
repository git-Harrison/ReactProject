import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReportDataSuccess} from '../../redux/actions/ReportActions';
import {Channels, Stores} from "../../services/ComponentService";
import {Report, ReportTotal} from "../../services/ReportService";
import useSelectedState from "../../hooks/SelectState";
import Select from "../../components/select/BasicSelect";
import Button from "../../components/button/Button";
import DateRangePicker from "../../components/select/DateSelect";
import BasicModal from "../../components/modal/BasicModal";

/**
 * 이 파일에서 조건들을 선택 후 API 호출을 하고, 데이터를 리덕스에 저장하는 역할을 함
 */

function UserSelectCondition(props) {
    const {
        selectedChannel,
        selectedStore,
        selectedStartDate,
        selectedEndDate,
        handleChannelChange,
        handleStoreChange,
        handleDateChange
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

    const closeModal = () => {
        setModalOpen(false);
    };

    // 채널 옵션 가져오기
    const fetchChannels = async () => {
        try {
            const channelData = await Channels();
            const options = channelData.map(channel => ({
                key: channel,
                value: channel
            }));
            setChannelOptions(options);
        } catch (error) {
            console.error('Failed to fetch channels:', error);
        }
    };

    // 스토어 옵션 가져오기
    const fetchStores = async () => {
        if (selectedChannel) {
            try {
                const storeData = await Stores(selectedChannel);
                const totalOptions = [
                    {key: 'Total', value: 'Total'},
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
        }
    };

    // 여기서 데일리랑 먼슬리 구분해서 reportApiUrl 를 변경하면 될것 같음, branch 파라미터는 Service 에서 넣어주고 있음
    function getReportApiUrl(pageMode, selectedChannel, selectedStore, selectedStartDate, selectedEndDate) {
        switch (pageMode) {
            case 'monthly':
                return `${baseDashBoardUrl}/order/monthly?channel=${selectedChannel}&brand_name=${selectedStore}`;
            case 'daily':
                return `${baseDashBoardUrl}/order/daily?channel=${selectedChannel}&brand_name=${selectedStore}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
            // case 'excelDownload':
            //     return `${baseDashBoardUrl}/order/monthly?channel=${selectedChannel}&brand_name=${selectedStore}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
            default:
                return "defaultOrErrorUrl";
        }
    }

    // API 호출 및 리덕스에 데이터 저장
    const handleClickFetch = async () => {
        if (selectedStore === undefined) {
            setModalOpen(true);
            setModalMessage('Please select a Store');
            return;
        }

        props.setLoading(true);

        const reportApiUrl = getReportApiUrl(props.pageMode, selectedChannel, selectedStore, selectedStartDate, selectedEndDate);

        try {
            const responseData = await Report(reportApiUrl);

            if (props.pageMode === 'daily') {
                const reportTotalApiUrl = `${baseDashBoardUrl}/order/daily-total?channel=${selectedChannel}&brand_name=${selectedStore}&start_date=${selectedStartDate}&end_date=${selectedEndDate}`;
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

    return (
        <>
            <BasicModal
                isOpen={isModalOpen}
                close={closeModal}
                modalTitle="Error"
                modalText={modalMessage}
            />
            <div className="top_nav">
                <Select
                    option={channelOptions}
                    title={selectedChannel || 'Channel'}
                    onSelectChange={handleChannelChange}
                    value={selectedChannel || ''}
                />
                {selectedChannel && (
                    <Select
                        option={storeOptions}
                        className="store_select"
                        title={decodedStore || 'Store'}
                        onSelectChange={handleStoreChange}
                        value={selectedStore || ''}
                    />
                )}
                {props.pageMode === 'daily' && (
                    <DateRangePicker
                        onDateChange={handleDateChange}
                        initialStartDate={props.initialValues.startDate}
                        initialEndDate={props.initialValues.endDate}
                    />
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