import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import Information from "../button/Information";
import Select from "../select/BasicSelect";

/**
 * API 데이터를 가져오는 컴포넌트
 * @param {string} type - 어떤 그래프 타입을 보여줄지
 * @param {string} title - 그래프 제목
 * @param {string} information - 그래프 제목
 * @param {Array} categories - x축에 들어갈 카테고리명
 * @param {Array} data - 그래프 데이터 값
 * @param {Array} data1 - 첫번째 그래프 데이터 값
 * @param {Array} data2 - 두번째 그래프 데이터 값
 * @param {Array} criteria - 그래프 기준
 * @param {Array} colors - 그래프 색상
 * @param {Array} height - 그래프 높이
 *
 */

const ApexGraphChart = (props) => {
    const { type, title, categories, data1, data2, criteria, colors, height, selectedCriteria, setSelectedCriteria, currency } = props;

    const customTooltipFormatter = (value, { seriesIndex, dataPointIndex }) => {
        const dataArrays = [props.data1, props.data2];
        const originalValue = dataArrays[seriesIndex][dataPointIndex];
        return originalValue ? originalValue : '0';
    };

    const options = {
        chart: {
            background: 'transparent', // 그래프 배경색
            toolbar: { // 그래프 상단 툴바 true로 하면 이상함
                show: true,
            },
            pan: {
                enabled: false, // Disable panning
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
        },
        colors: colors || ['#008FFB'], // 그래프 색상
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
        },
        grid: { // 뒷 배경 그리드
            strokeDashArray: 0, //그리드 0: 실선 , 1: 점선
            borderColor: '#8f919340',
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                    strokeWidth: 0.5, // 그리드 가로 선 두께
                },
            },
            yaxis: {
                lines: {
                    show: true,
                    strokeWidth: 0.5, // 그리드 세로 선 두께
                },
            },
        },
        xaxis: { // x축 선
            categories: categories || [],
            labels: {
                style: {
                    colors: '#A1AAB3', // 텍스트 라벨 색상
                },
            },
            axisBorder: {
                color: '#8f919340',
            },
            axisTicks: {
                color: '#8f919340',
            },
        },
        yaxis: { // y축 선
            labels: {
                style: {
                    colors: '#A1AAB3', // 텍스트 라벨 색상
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
            colors: colors, // 그래프 색상
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
                        ? val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + currency
                        : null;
                }
            },
        },
        markers: { // 동그라미 마커 색상
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

    const series = [
        {
            name: criteria ? criteria[0] : "",
            data: data1 || [],
            colors: colors ? colors[0] : "",
        },
        {
            name: criteria ? criteria[1] : "",
            data: data2 || [],
            colors: colors ? colors[1] : "",
        },
    ];

    return (
        <div className="apex_chart card">
            <div className="card_title_area">
                <h2 className="card_title">{title}</h2>
                {title === "Daily Sales Comparison_MoM (Shipped amount)" && (
                    <Information text="Comparing daily sales data between last month and this month (MOM)" />
                )}
                {["Amazon Monthly Orders", "Amazon Monthly Payment", "Amazon Monthly NetIncome"].includes(title) && (
                    <Select className="select_criteria"
                            title="Select Criteria"
                            option={[
                                { key: "orders", value: "Orders" },
                                { key: "payment", value: "Payment" },
                                // { key: "netIncome", value: "Net Income" }
                            ]}
                            onSelectChange={(key) => setSelectedCriteria(key)}
                            selectedValue={selectedCriteria}
                    />
                )}
            </div>
            <ReactApexChart
                options={options}
                series={series}
                type={type}
                height={height}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};

ApexGraphChart.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.string),
    data1: PropTypes.arrayOf(PropTypes.string),
    data2: PropTypes.arrayOf(PropTypes.string),
    criteria: PropTypes.arrayOf(PropTypes.string),
    colors: PropTypes.arrayOf(PropTypes.string),
    criteriaType: PropTypes.string,
    height: PropTypes.string,
    selectedCriteria: PropTypes.string,
    setSelectedCriteria: PropTypes.func
};

export default ApexGraphChart;