import {useState} from 'react';
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

export const PieGraph = (props) => {
  const {detail,label} = props;
  const [graphLabel, setLabel] = useState([]);
  const [values, setData] = useState([]);
  if (detail !== undefined && detail !== null && graphLabel.length === 0) {
    let labelsList = Object.keys(detail);
    let graphValues = [];
    for (let key of labelsList) {
      graphValues.push(detail[key])
    }
    console.log(detail,labelsList,graphValues)
    setLabel(labelsList);
    setData(graphValues);
  }
    const data = {
      labels: graphLabel,
      datasets: [{
          label: label,
          data: values,
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
      <Pie
        data={data}
        height="340px"
        width="390px"
        options={{
            maintainAspectRatio: false,
            responsive: true,
          plugins: {
            title: {
              display: true,
              text: label
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