import React from "react";
import ApexMonthlyChart from "../../../components/chart/ApexMonthlyChart";
import MonthlyAmountTable from "../../../components/table/MonthlyAmountTable";
import MonthlyOrderDataFetcher from "./MonthlyOrderDataFetcher";
import UserInputHandler from "../UserInputHandler";
export const MonthlyOrderReport = (props) => {
    const {storeSelect, channelOptions, selectedState, pageMode} = props;
    const {
        data,
        loading,
        months,
        columns,
        fetchData,
    } = MonthlyOrderDataFetcher({
        selectedState,
    });

    return (
        <>
            <UserInputHandler
                pageMode={pageMode} // 페이지 모드
                channelOptions={channelOptions} //채널 옵션
                storeSelect={storeSelect} // 브랜드 옵션
                handleChannelChange={selectedState.handleChannelChange} // 채널 변경 핸들러
                fetchData={fetchData} // 데이터 가져오기 함수
            />
            <ApexMonthlyChart data={data} loading={loading}/>
            <MonthlyAmountTable
                data={data}
                columns={columns}
                months={months}
                loading={loading}
            />
        </>
    );
};

export default MonthlyOrderReport;