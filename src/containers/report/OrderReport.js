import React from "react";
import UserInputHandler from './UserInputHandler';
import ReportDataTable from './ReportDataTable';
import OrderDataFetcher from './OrderDataFetcher';
import ApexMonthlyChart from '../../components/chart/ApexMonthlyChart';

const OrderReport = (props) => {
    const {
        pageMode,
        columns,
        initialApiURL,
        shopifyInitialApiURL, // 데일리에서 수정된 부분 (나중에 뷰 서버 생기면 지워야함 변수도 지워야지)
        tiktokInitialApiURL,
        channelOptions,
        storeSelect,
        typeOptions,
        monthOptions,
        timeZoneOptions,
        selectedState,
        initialSelect
    } = props;
    const {
        data,
        dataTotal,
        loading,
        fetchButtonClicked,
        storeValue,
        fetchData,
    } = OrderDataFetcher({
        pageMode,
        selectedState,
        initialApiURL,
        shopifyInitialApiURL,
        tiktokInitialApiURL,
        columns
    }); // DailyDataFetcher 컴포넌트에서 반환된 데이터와 상태

    let updatedColumns = [...columns];

    if (storeValue !== null && storeValue !== "null") {
        let startNumber = 2;
        if (pageMode === 'monthly') startNumber = 1;
        if (pageMode !== 'excel') {
            updatedColumns = [
                ...updatedColumns.slice(0, startNumber),
                {
                    Header: 'Store',
                    accessor: 'store',
                },
                ...updatedColumns.slice(startNumber),
            ];
        }
    }

    return (
        <>
            <UserInputHandler
                pageMode={pageMode} // 페이지 모드
                selectChannel={selectedState.selectedChannel} // 채널 선택
                channelOptions={channelOptions} //채널 옵션
                storeSelect={storeSelect} // 브랜드 옵션
                typeOptions={typeOptions} // 타입 옵션
                monthOptions={monthOptions} // 월 옵션
                timeZoneOptions={timeZoneOptions} // 데이터 타입 옵션
                handleChannelChange={selectedState.handleChannelChange} // 채널 변경 핸들러
                handleTypeChange={selectedState.handleTypeChange} // 타입 변경 핸들러
                handleDateChange={selectedState.handleDateChange} // 날짜 변경 핸들러
                handleTimeZoneChange={selectedState.handleTimeZoneChange} // 데이터 타입 변경 핸들러
                handleMonthChange={selectedState.handleMonthChange}
                typeDataValue={selectedState.selectedType}
                fetchData={fetchData} // 데이터 가져오기 함수
                initialSelect={initialSelect} // 초기 select 값
            />
            {pageMode === 'monthly' && (
                <ApexMonthlyChart data={data} loading={loading}/>
            )}
            <ReportDataTable
                pageMode={pageMode}
                data={data} // 데이터
                dataTotal={dataTotal} // 데이터 합계
                loading={loading} // 로딩 상태
                columns={updatedColumns} // 컬럼 정보
                fetchButtonClicked={fetchButtonClicked}
            />
        </>
    );
}

export default OrderReport;