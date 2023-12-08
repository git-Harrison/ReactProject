import React from 'react';
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import LoadingMsg from "../LoadingMsg";

const ApexMonthlyChart = (props) => {
    const {data: inputData, loading} = props;
    const data = Array.isArray(inputData) ? inputData : [inputData];

    const colors = [
        "#fb9778",
        "#75D701",
        "#f9c00c",
        "#f9320c",
        "#99f19e",
        "#30A9DE",
        "#6C49B8",
        "#FFBC42",
        "#D1B6E1",
        "#00b9f1",
        "#EFDC05",
        "#E53A40",
        "#FBFFB9",
        "#EC7357",
        "#8CD790",
        "#9fc0b4",
        "#41D3BD",
    ]

    if (loading || !data[0]) {
        return <div></div>; // 로딩 메세지 반환
    }

    // 각 상점별로 시리즈를 구성
    const series = data.flatMap(store => {
        if (!store || !store.result) {
            return []; // 결과가 없는 경우, 빈 배열을 반환
        }

        return store.result.map(result => {
            if (!result.month) {
                return {
                    name: 'Undefined Store',
                    data: []
                };
            }

            const data = Object.values(result.month).map(sale => {
                const amount = sale && sale.sales_total ? parseFloat(sale.sales_total.amount) : 0;

                return amount;
            });

            return {
                name: result.store ? result.store : result.channel,
                data,
                colors: colors ? colors[0] : ""
            };
        });
    });

    const categories = data[0] && data[0].result[0].month ? Object.keys(data[0].result[0].month) : [];
    const currency = data[0].result[0].month.Jan.sales_total.currency;

    const options = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: {
                show: true,
            },
            pan: {
                enabled: false, // Disable panning
            },

        },
        colors: colors || ['#008FFB'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
        },
        grid: {
            strokeDashArray: 0,
            borderColor: '#8f919340',
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                    strokeWidth: 0.5,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                    strokeWidth: 0.5,
                },
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#A1AAB3',
                },
            },
            axisBorder: {
                color: '#8f919340',
            },
            axisTicks: {
                color: '#8f919340',
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#A1AAB3',
                },
                formatter: (value) => {
                    return value !== null ? value.toLocaleString() : ""
                },
            },
            axisBorder: {
                color: '#8f919340',
            },
            axisTicks: {
                color: '#8f919340',
            },
        },
        fill: {
            colors: colors,
            opacity: 0.6,
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            position: 'auto',
            y: {
                formatter: function(val) {
                    return val !== undefined && val !== null
                        ? val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2}) + " " + currency
                        : ""
                }
            },
        },
        markers: {
            size: 3,
            colors: colors,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            shape: 'circle',
            radius: 2,
            hover: {
                size: 8,
            },
        },
        zoom: {
            enabled: false
        },
    };

    return (
        <div className="apex_chart card monthly m-15 mt-30">
            <ReactApexChart
                options={options}
                series={series}
                height={300}
                style={{width: '100%'}}
            />
        </div>
    );
}

ApexMonthlyChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    loading: PropTypes.bool
};

export default ApexMonthlyChart;