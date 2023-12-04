import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

/**
 * API 데이터를 가져오는 컴포넌트
 * @param {string} type - 어떤 그래프 타입을 보여줄지
 * @param {string} title - 그래프 제목
 * @param {Array} data - 그래프 데이터 값
 * @param {Array} colors - 그래프 색상
 *
 */

const ApexCircleChart = (props) => {
    const { title, type, data, colors, width } = props;

    const options = {
        series: data,
        options: {
            chart: {
                type: type,
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: 'var(--nav-text-color)',
                        },
                        value: {
                            fontSize: '14px',
                            color: 'var(--nav-text-color)',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: 'var(--nav-text-color)',
                            formatter: () => {
                                return '100%';
                            },
                        },
                    },
                },
            },
            labels: ['2021', '2022', '2023'],
            colors: colors,
        },
        width: width,
    };

    return (
        <div className="apex_chart card">
            <h2 className="card_title">{title}</h2>
            <ReactApexChart
                options={options.options}
                series={options.series}
                type={options.options.chart.type}
                style={{ width: options.width }}
            />
        </div>
    );
};

ApexCircleChart.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default ApexCircleChart;