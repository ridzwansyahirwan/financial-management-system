import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import '../style/dashboard.css';
import backgroundImage from './latar.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';

function Report() {
    const backgroundStyles = {
        backgroundImage: `url(${backgroundImage})`,
        minWidth: '100%',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
    };

    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);
    const [timeFrame, setTimeFrame] = useState('day');
    const [selectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const chartRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost/fms-backend/report.php?timeFrame=${timeFrame}&selectedMonth=${selectedMonth}`)
            .then(response => {
                setTotalExpense(response.data.totalExpense);
            })
            .catch(error => {
                console.error('Error fetching total expense:', error);
                setTotalExpense(0);
            });
    }, [timeFrame, selectedMonth]);

    useEffect(() => {
        axios.get(`http://localhost/fms-backend/budgetReport.php?timeFrame=${timeFrame}&selectedMonth=${selectedMonth}`)
            .then(response => {
                setTotalBudget(response.data.totalBudget);
            })
            .catch(error => {
                console.error('Error fetching total budget:', error);
                setTotalBudget(0);
            });
    }, [timeFrame, selectedMonth]);

    useEffect(() => {
        const fetchDataForMonth = async () => {
          try {
            const response = await axios.get(`http://localhost/fms-backend/expenseData.php?selectedMonth=${selectedMonth}`);
            const expenseData = response.data.expenseData || [];
      
            if (chartRef.current && expenseData.length > 0) {
              if (window.myChart) {
                window.myChart.destroy();
              }
      
              window.myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                  labels: expenseData.map(expense => expense.date),
                  datasets: [
                    {
                      label: 'Total Expenses',
                      data: expenseData.map(expense => expense.amount),
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              });
            }
          } catch (error) {
            console.error('Error fetching month-wise expense data:', error);
          }
        };
      
        const fetchDataForYear = async () => {
            try {
                const [expenseResponse, budgetResponse] = await Promise.all([
                    axios.get(`http://localhost/fms-backend/expenseData.php?timeFrame=year`),
                    axios.get(`http://localhost/fms-backend/budgetData.php?selectedYear=${selectedYear}`)
                ]);
    
                const expenseData = expenseResponse.data.expenseData || [];
                const budgetData = budgetResponse.data.budgetData || [];
    
                if (!expenseData || !budgetData) {
                    throw new Error('Expense or budget data is undefined');
                  }
            
                  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                  const chartLabels = monthNames.map((month, index) => month);
                  const chartExpenseData = monthNames.map((month, index) => {
                    const monthExpense = expenseData.find(expense => parseInt(expense.month) === index + 1);
                    return monthExpense ? monthExpense.totalAmount : 0;
                  });
                  const chartBudgetData = monthNames.map((month, index) => {
                    const monthBudget = budgetData.find(budget => parseInt(budget.month) === index + 1);
                    return monthBudget ? monthBudget.totalAmount : 0;
                  });
            
                if (chartRef.current && expenseData.length > 0 && budgetData.length > 0) {
                    if (window.myChart) {
                        window.myChart.destroy();
                    }
    
                    window.myChart = new Chart(chartRef.current, {
                        type: 'bar',
                        data: {
                            labels: chartLabels,
                            datasets: [
                                {
                                    label: 'Total Expenses',
                                    data: chartExpenseData,
                                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Total Budget',
                                    data: chartBudgetData,
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                }
            } catch (error) {
                console.error('Error processing year-wise expense and budget data:', error);
            }
        };
    
        if (timeFrame === 'month') {
            console.log('Fetching data for month...');
            fetchDataForMonth();
        } else if (timeFrame === 'year') {
            console.log('Fetching data for year...');
            fetchDataForYear();
        }
    }, [selectedMonth, selectedYear, timeFrame]); 


    const handleTimeFrameChange = (selectedTimeFrame) => {
        setTimeFrame(selectedTimeFrame);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    return (
        <div className="header" style={backgroundStyles}>
            <Navbar />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="mb-4">Total Budget: RM {totalBudget}</h2>
                        <h2 className="mb-4">Total Expense: RM {totalExpense}</h2>
                        <div className="form-group">
                            <label htmlFor="timeFrame">Show Total By:</label>
                            <select className="form-control" id="timeFrame" value={timeFrame} onChange={(e) => handleTimeFrameChange(e.target.value)}>
                                <option value="day">Day</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                        {timeFrame === 'month' && (
                            <div className="form-group">
                                <label htmlFor="selectedMonth">Select Month:</label>
                                <select className="form-control" id="selectedMonth" value={selectedMonth} onChange={handleMonthChange}>
                                    {[...Array(12)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>{new Date(null, index).toLocaleDateString('en', { month: 'long' })}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mt-4">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}

export default Report;
