import { useEffect, useState } from 'react';
import {OrderComparison} from "../../services/ReportService";
import {useSelector} from "react-redux";
const UseMainChart = () => {
    const [apexChartData, setApexChartData] = useState(null);
    const [chartDataValue, setChartDataValue] = useState(null);
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    const fetchForwardComparison = async () => {
        try {
            const responseData = await OrderComparison();
            if (!responseData) {
                throw new Error('API request failed');
            }
            setApexChartData(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchForwardComparison();
    }, [currentBranch]);

    useEffect(() => {
        if (apexChartData) {
            // Create a fixed array for categories from 1 to 31
            const categories = Array.from({ length: 31 }, (_, index) => index + 1);

            // Map the API data to the chart format
            const mapDataToChartFormat = (data) => {
                return categories.map(day => {
                    const dataItem = data.find(item => parseInt(item.date.split('-')[2], 10) === day);
                    return dataItem ? `${dataItem.amount} ${dataItem.currency}` : null;
                });
            };

            const data1 = mapDataToChartFormat(apexChartData.last_month);
            const data2 = mapDataToChartFormat(apexChartData.this_month);
            const currency = apexChartData.this_month[0].currency;

            const dataValue = {
                type: 'area',
                title: 'Daily Sales Comparison_MoM (Shipped amount)',
                categories: categories.map(day => `${String(day).padStart(2, '0')}`), // Assuming the data is for November 2023
                data1: data1,
                data2: data2,
                criteria: ['Last Month', 'This Month'],
                colors: ['#03c9d7', '#fb9778'],
                currency: currency,

            };

            setChartDataValue(dataValue);
        }
    }, [apexChartData]);

    return chartDataValue;
}

export default UseMainChart;