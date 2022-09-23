import {useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = (props) => {
  const {detail,label} = props;
  const [graphLabel, setLabel] = useState([]);
  const [values, setData] = useState([]);
  
  useEffect(() => {
    const activeObj = detail.filter((obj) => {
      return obj.isSelected
    })[0];

    if (activeObj !== undefined && Object.keys(activeObj).length > 0) {

    let resulArray = activeObj.results ? activeObj.results:[];

    let labelsArray = [];
    let  valuesArray = [];
    let index = 1;
    for (let valueObj of resulArray) {
      let label = valueObj.country !==  undefined && (valueObj.country).length > 0 ? valueObj.country : `Label_${index}`;
      let value = valueObj.count !== undefined ? valueObj.count : `Count_${index}`;
      index ++;
      labelsArray.push(label);
      valuesArray.push(value);
    }

    console.log(labelsArray,valuesArray,"valuesArrayvaluesArray")
    setLabel(labelsArray);
    setData(valuesArray);
  }
  },[detail]);
  
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
      <Doughnut
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