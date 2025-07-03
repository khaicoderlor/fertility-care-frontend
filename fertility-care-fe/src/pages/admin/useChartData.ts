import type { ChartTab } from './ChartTabs';

export const useChartData = () => {
  const chartTabs: ChartTab[] = [
    {
      id: 'success',
      label: 'Tỷ lệ thành công IUI vs IVF',
      icon: 'fas fa-chart-pie',
      config: {
        title: 'Tỷ lệ thành công IUI vs IVF',
        type: 'bar',
        data: {
          labels: ['IVF', 'IUI'],
          datasets: [{
            label: 'Tỷ lệ thành công (%)',
            data: [72, 45],
            backgroundColor: ['#8b5cf6', '#3b82f6'],
            borderRadius: 8,
            barPercentage: 0.6
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value: number) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  return `${context.dataset.label}: ${context.parsed.y}%`;
                }
              }
            }
          }
        }
      }
    },
    {
      id: 'revenue',
      label: 'Doanh thu trong tháng',
      icon: 'fas fa-dollar-sign',
      config: {
        title: 'Doanh thu trong tháng',
        type: 'line',
        data: {
          labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
          datasets: [{
            label: 'Doanh thu (VNĐ)',
            data: [450000000, 620000000, 580000000, 740000000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value: number) {
                  return (value / 1000000).toFixed(0) + 'M VNĐ';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  const value = context.parsed.y;
                  return `Doanh thu: ${(value / 1000000).toFixed(1)}M VNĐ`;
                }
              }
            }
          }
        }
      }
    },
    {
      id: 'doctors',
      label: 'Bác sĩ có tỷ lệ rate & booking cao nhất',
      icon: 'fas fa-star',
      config: {
        title: 'Bác sĩ có tỷ lệ rate & booking cao nhất',
        type: 'bar',
        data: {
          labels: ['BS. Nguyễn A', 'BS. Trần B', 'BS. Lê C', 'BS. Phạm D', 'BS. Hoàng E'],
          datasets: [
            {
              label: 'Tỷ lệ rating (sao)',
              data: [4.8, 4.6, 4.7, 4.5, 4.9],
              backgroundColor: '#f59e0b',
              borderRadius: 6,
              yAxisID: 'y'
            },
            {
              label: 'Số lượng booking',
              data: [45, 38, 42, 35, 48],
              backgroundColor: '#3b82f6',
              borderRadius: 6,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              max: 5,
              ticks: {
                callback: function (value: number) {
                  return value + ' ⭐';
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                callback: function (value: number) {
                  return value + ' booking';
                }
              },
              grid: {
                drawOnChartArea: false,
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  const datasetLabel = context.dataset.label;
                  const value = context.parsed.y;
                  if (datasetLabel.includes('rating')) {
                    return `${datasetLabel}: ${value} ⭐`;
                  } else {
                    return `${datasetLabel}: ${value} booking`;
                  }
                }
              }
            }
          }
        }
      }
    }
  ];

  const updateChartDataByTimeFilter = (chartId: string, timeFilter: string) => {
    // Simulate different data based on time filter
    const chart = chartTabs.find(tab => tab.id === chartId);
    if (!chart) return chart;

    // Clone the chart config to avoid mutation
    const updatedChart = { ...chart };
    updatedChart.config = { ...chart.config };
    updatedChart.config.data = { ...chart.config.data };

    // Update data based on time filter (this would normally come from API)
    switch (timeFilter) {
      case '3 tháng':
        if (chartId === 'revenue') {
          updatedChart.config.data.labels = ['Tháng 1', 'Tháng 2', 'Tháng 3'];
          updatedChart.config.data.datasets[0].data = [1200000000, 1450000000, 1380000000];
        }
        break;
      case '6 tháng':
        if (chartId === 'revenue') {
          updatedChart.config.data.labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
          updatedChart.config.data.datasets[0].data = [1200000000, 1450000000, 1380000000, 1600000000, 1550000000, 1750000000];
        }
        break;
      case 'Năm nay':
        if (chartId === 'revenue') {
          updatedChart.config.data.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
          updatedChart.config.data.datasets[0].data = [4200000000, 4800000000, 5100000000, 5600000000];
        }
        break;
    }

    return updatedChart;
  };

  return {
    chartTabs,
    updateChartDataByTimeFilter
  };
};
