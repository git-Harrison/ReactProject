import {useState, useEffect} from 'react';

export const useSelectedState = (initialValues = {}) => {
    const [selectedChannel, setSelectedChannel] = useState(initialValues.channel || null);
    const [selectedStore, setSelectedStore] = useState(initialValues.store || null);
    const [selectedType, setSelectedType] = useState(initialValues.type || null);
    const [selectedStartDate, setSelectedStartDate] = useState(initialValues.startDate || null);
    const [selectedEndDate, setSelectedEndDate] = useState(initialValues.endDate || null);
    const [selectedTimeZone, setSelectedTimeZone] = useState(initialValues.timeZone || null);
    const [selectedMonth, setSelectedMonth] = useState(initialValues.month || null);
    const [selectedSeller, setSelectedSeller] = useState(initialValues.seller || null);
    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_REPORT_AMAZON_API_URL);

    const handleChannelChange = (selectedId, selectedValue) => {
        setSelectedChannel(selectedValue);
    };

    const handleStoreChange = (selectedId, selectedValue) => {
        setSelectedStore(selectedValue);
    };

    const handleTypeChange = (selectedId, selectedValue) => {
        setSelectedType(selectedValue);
    };

    const handleTimeZoneChange = (selectedId, selectedValue) => {
        setSelectedTimeZone(selectedValue);
    };

    const handleDateChange = (startDate, endDate) => {
        const formatStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const formatEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

        setSelectedStartDate(formatStartDate);
        setSelectedEndDate(formatEndDate);
    };

    const handleMonthChange = (selectedId, selectedValue) => {
        setSelectedMonth(selectedValue);
    };

    const handleSellerChange = (selectedId, selectedValue) => {
        setSelectedSeller(selectedValue);

    };

    useEffect(() => {
        if (selectedChannel === "Shopify") {
            setApiUrl(process.env.REACT_APP_REPORT_SHOPIFY_API_URL);
        } else if (selectedChannel === "Tiktokshop") {
            setApiUrl(process.env.REACT_APP_REPORT_TIkTOK_API_URL);
        } else {
            setApiUrl(process.env.REACT_APP_REPORT_AMAZON_API_URL);
        }

    }, [selectedChannel]);

    return { // 선택된 상태 변수와 변경 함수 반환
        selectedChannel,
        selectedStore,
        selectedType,
        selectedStartDate,
        selectedEndDate,
        selectedMonth,
        selectedTimeZone,
        selectedSeller,
        handleChannelChange,
        handleStoreChange,
        handleTypeChange,
        handleDateChange,
        handleTimeZoneChange,
        handleMonthChange,
        handleSellerChange,
        apiUrl
    };
}

export default useSelectedState;