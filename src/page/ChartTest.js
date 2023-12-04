import ApexGraphChart from "../components/chart/ApexGraphChart";
import React from "react";
import ApexCircleChart from "../components/chart/ApexCircleChart";

const chartData1 = {
    type: 'area',
    title: 'Line Chart',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data1: [150, 300, 450, 310, 400, 600, 300, 250, 450, 600, 1000, 900],
    data2: [700, 780, 1200, 1100, 2500, 3400, 4500, 2900, 1700, 2800, 3000, 3200],
    colors: ['#398bf7', '#06d79c'],
};

const chartData2 = {
    type: 'line',
    title: 'Area Chart',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data1: [150, 300, 450, 310, 400, 600, 300, 250, 450, 600, 1000, 900],
    data2: [700, 780, 1200, 1100, 2500, 3400, 4500, 2900, 1700, 2800, 3000, 3200],
    colors: ['#398bf7', '#06d79c'],
};

const chartData3 = {
    type: 'bar',
    title: 'Bar Chart',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data1: [150, 300, 450, 310, 400, 600, 300, 250, 450, 600, 1000, 900],
    data2: [700, 780, 1200, 1100, 2500, 3400, 4500, 2900, 1700, 2800, 3000, 3200],
    colors: ['#398bf7', '#06d79c'],
};

const chartData4 = {
    type: 'pie',
    title: 'Circle Chart',
    data: [10, 20, 40],
    colors: ['#feb019', '#398bf7', '#06d79c'],
    width: "91%",

};

const chartData5 = {
    type: 'radialBar',
    title: 'Circle Chart',
    data: [60],
    colors: ['#06d79c'],
    width: "100%",
};


function ChartTest() {
    return (
        <div id="page_wrapper" className="page_wrapper">
            <div className="page_contents">
                <div className="chart_wrap">
                    <div className="test_chart">
                        <ApexGraphChart {...chartData1}/>
                    </div>
                    <div className="test_chart">
                        <ApexGraphChart {...chartData2}/>
                    </div>
                    <div className="test_chart">
                        <ApexGraphChart {...chartData3}/>
                    </div>
                    <div className="test_chart">
                        <ApexCircleChart {...chartData4}/>
                    </div>
                    <div className="test_chart">
                        <ApexCircleChart {...chartData5}/>
                    </div>
                </div>
            </div>f6 i
        </div>
    );
}

export default ChartTest;