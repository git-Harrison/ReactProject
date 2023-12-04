import BasicTable from "../../components/table/BasicTable";
import DynamicTable from "../../components/table/DynamicTable";
import LoadingMsg from "../../components/LoadingMsg";
import {NoDataMsg} from "../../components/NoDataMsg";

/**
 * 로딩 상태와 데이터 상태에 따라 메세지를 보여주거나 데이터로 테이블을 렌더링하는 역할
 * @param {string} pageMode - 어떤 페이지인지
 * @param {Array} data - 테이블에 표시될 데이터
 * @param {Array} dataTotal - 테이블에 표시될 data 합산 데이터
 * @param {boolean} loading - 로딩 상태
 * @param {Array} columns - 테이블의 칼럼 정보
 * @param {boolean} fetchButtonClicked - fetch 버튼이 클릭되었는지
 *
 */

function ReportDataTable(props) {
    const {pageMode, data, dataTotal, loading, columns, fetchButtonClicked} = props;

    if (loading) {
        return <LoadingMsg className="table"/>; // 로딩 메세지 반환
    }

    if (data && data.length > 0) {
        if (pageMode === "excel") {
            return <BasicTable columns={columns} data={data}/>; // 테이블 반환
        } else {
            return <DynamicTable columns={columns} data={data} dataTotal={dataTotal} pageMode={pageMode}/>; // 테이블 반환
        }
    }

    if (typeof data === 'object' && data.message === "Data Not Found" || fetchButtonClicked) {
        return <NoDataMsg className="table" msg="No data you're trying to find Please check the requirements"/>; // 데이터 없음 메세지 반환
    }

    return null;
}

export default ReportDataTable;