import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'

const ValedoresChart = ({ valedores }) => {
  useEffect(() => {
    createGraph(valedores)
  }, [])

  const createGraph = (valedores) => {
    const ctx = document.getElementById('myChart')
    if (window.myCharts !== undefined) window.myCharts.destroy()
    window.myCharts = new Chart(ctx, {
      type: 'line',
      data: {
        labels: valedores.map((valedor) => valedor.firstName),
        datasets: [
          {
            label: 'Valedores',
            data: valedores.map((valedor) => valedor.estatus),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: false,
        scales: {
          xAxes: {
            stacked: true
          }
        }
      }
    })
  }

  return <canvas id="myChart"></canvas>
}

export default ValedoresChart

// import React from 'react'

// const ValedoresChart = () => {
//   return <div>test</div>
// }

// export default ValedoresChart
