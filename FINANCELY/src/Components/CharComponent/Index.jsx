import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import './styles.css';
import moment from 'moment';

function ChartComponent({ sortedTransactions }) {
    const lineChartData = sortedTransactions.map((item) => ({
        date: moment(item.date).format('YYYY-MM-DD'),
        amount: item.amount,
    }));

    const pieChartData = sortedTransactions
        .filter((transaction) => transaction.type === 'expense')
        .map((item) => ({
            tag: item.tag,
            amount: item.amount,
        }));

    const lineChartConfig = {
        data: lineChartData,
        xField: 'date',
        yField: 'amount',
        xAxis: {
            title: {
                text: 'Date',
                style: { fontSize: 14 },
            },
            label: {
                style: { fontSize: 12 },
                formatter: (text) => moment(text).format('MMM DD, YYYY'),
            },
        },
        yAxis: {
            title: {
                text: 'Amount',
                style: { fontSize: 14 },
            },
            label: { style: { fontSize: 12 } },
        },
        point: {
            size: 5,
            shape: 'circle',
        },
        color: '#003f5c',
        lineStyle: {
            stroke: '#003f5c',
            lineWidth: 2,
        },
        smooth: true,
        height: 400,
        autoFit: true,
    };

    const pieChartConfig = {
        data: pieChartData,
        angleField: 'amount',
        colorField: 'tag',
        radius: 0.8,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        autoFit: true,
    };

    return (
        <div className='chart-wrapper'>
            <div className='chart-container'>
                <h2>Your Analytics</h2>
                <Line {...lineChartConfig} />
            </div>
            <div className='chart-container'>
                <h2>Your Spendings</h2>
                <Pie {...pieChartConfig} />
            </div>
        </div>
    );
}

export default ChartComponent;
