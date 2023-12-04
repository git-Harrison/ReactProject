export function fetchReportDataSuccess(data, total = null) {
    return {
        type: 'FETCH_REPORT_DATA_SUCCESS',
        payload: {
            data: data,
            total: total
        }
    };
}