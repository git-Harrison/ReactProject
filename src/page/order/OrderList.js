import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useSelectedState from "../../hooks/SelectState";
import {MessageContext} from "../../contexts/MessageContext";
import Navbar from '../../containers/order/UserInputNavbar';
import SearchBar from '../../containers/order/SearchBar';
import DataTable from '../../containers/order/OrderDataTable';
import {OrderListRequest, OrderListSearchRequest} from "../../services/OrderService";

export const OrderList = () => {
    // 상태 선택 및 메시지 컨텍스트 가져오기
    const selectedState = useSelectedState();
    const {setExplanation} = useContext(MessageContext);

    // 파라미터 pending,shipped,canceled 체크
    let {status} = useParams();

    const noticeMsg = "* These are " + status + " order list";

    // 데이터와 페이지 정보 상태 설정
    const [data, setData] = useState([]);
    const [lastPage, setLastPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // 로딩 및 데이터 없음 상태 설정
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    // 검색 및 API URL 상태 설정
    const [search, setSearch] = useState("");
    const initialApiUrl = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderList?status=${status}&merchant_token=all&seller=all&startDate=2023-07-01&endDate=2023-07-15`;
    const [apiUrl, setApiUrl] = useState(initialApiUrl);

    // API 콜 함수들
    // 주문 데이터를 가져오는 함수
    const fetchData = async (page = 1) => {
            setLoading(true);
            setNoData(false);
        try {
            const responseData = await OrderListRequest(apiUrl, page);

            if (responseData && responseData.data && responseData.data.length > 0) {
                setData(responseData.data);
                setLastPage(responseData.last_page);
                setCurrentPage(page);
            } else {
                setNoData(true);
            }
        } catch (error) {
            setNoData(true);
        } finally {
            setLoading(false);
        }
    };

    // 검색 결과를 가져오는 함수
    const fetchSearchResults = async () => {
        setLoading(true);
        setNoData(false);
        try {
            const responseData = await OrderListSearchRequest(search);

            if (responseData && responseData.length > 0) {
                setData(responseData);
                setLastPage(0);
            } else {
                setNoData(true);
            }
        } catch (error) {
            setNoData(true);
        } finally {
            setLoading(false);
        }
    };

    // 이벤트 핸들러 함수들
    // 새로운 API URL 설정
    const handleFetchClick = () => {
        const newApiUrl = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderList?status=${status}&merchant_token=${selectedState.selectedStore}&seller=${selectedState.selectedSeller}&startDate=${selectedState.selectedStartDate}&endDate=${selectedState.selectedEndDate}`;
        setApiUrl(newApiUrl);
    }

    // 검색 상태 업데이트
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    // 사이드 이펙트 함수들
    // API URL 변경 시 데이터 가져오기
    useEffect(() => {
        fetchData();
        setExplanation(noticeMsg);
    }, [apiUrl]);

    // 상태 변경 시 (파라미터 값) API URL 업데이트
    useEffect(() => {
        if(status) { // status 값이 있을 때만 API URL 업데이트
            const newApiUrl = `${process.env.REACT_APP_REPORT_AMAZON_API_URL}/orderList?status=${status}&merchant_token=all&seller=all&startDate=2023-07-01&endDate=2023-07-15`;
            setApiUrl(newApiUrl);
        }
    }, [status]);

    return (
        <>
            <Navbar
                selectedState={selectedState}
                loading={loading}
                handleFetchClick={handleFetchClick}
            />
            <SearchBar
                loading={loading}
                search={search}
                handleSearch={handleSearch}
                fetchSearchResults={fetchSearchResults}
                label="Search by Amazon Order ID"
                placeholder="Order ID"
            />
            <DataTable
                loading={loading}
                noData={noData}
                data={data}
                lastPage={lastPage}
                fetchData={fetchData}
                currentPage={currentPage}
            />
        </>
    );
}

export default OrderList;
