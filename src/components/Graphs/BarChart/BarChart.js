import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export const BarChart = () => {

    const data = {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
      datasets: [{
          label: '# of Lotteries',
          data: [12, 19, 3, 5, 2, 3],
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
      }]
  }

  return (
    <div>
      <Bar
        data={data}
        height="340px"
  width="451px"
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Lottery Details"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};