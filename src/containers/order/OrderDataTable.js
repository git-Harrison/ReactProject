import LoadingMsg from "../../components/LoadingMsg";
import NoDataMsg from "../../components/NoDataMsg";
import PaginationTable from "../../components/table/PaginationTable";

const OrderDataTable = (props) => {
    const {loading, noData, data, lastPage, fetchData, currentPage} = props;

    return (
        <>
            {loading ? <LoadingMsg className="table"/> :
                (noData ? <NoDataMsg className="table" msg="No data found"/> :
                    <PaginationTable data={data} lastPage={lastPage} fetchData={fetchData} currentPage={currentPage}/>)}
        </>
    );
}

export default OrderDataTable;