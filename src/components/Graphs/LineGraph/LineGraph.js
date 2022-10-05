import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";


export const LineGraph = (props) => {

  const {graph1X,graph1Y,lineGraphData} = props;

  const [value, setValue] = useState({})
useEffect(() => {
  const xAxisActiveObj = graph1X.filter((obj) => {
    return obj.isSelected;
  })[0];

  const yAxisActiveObj = graph1Y.filter((obj) => {
    return obj.isSelected;
  })[0];

  getValues(xAxisActiveObj,yAxisActiveObj);
},[graph1X,graph1Y]);

    const getValues = (xAxisActiveObj,yAxisActiveObj) => {
      
      let activeObjKey = `${xAxisActiveObj.id}_${yAxisActiveObj.id}`;

      let keysObj = {
        year_registration: "yearwiseRegistartionsCount",
        month_registration: "monthwiseRegistartionsCount",
        day_registration:"daywiseRegistartionsCount",
        day_goldMember:"",
        month_goldMember:"",
        year_goldMember:"",
        year_auction:"yearwiseExecutedAuctionsCount",
        month_auction:"monthwiseExecutedAuctionsCount",
        day_auction:"daywiseExecutedAuctionsCount",
        day_lottery:"daywiseExecutedLotteriesCount",
        month_lottery:"monthwiseExecutedLotteriesCount",
        year_lottery:"yearwiseExecutedLotteriesCount",
        year_users:"",
        month_users:"",
        day_users:""
      }

      let xAxisKey = `${xAxisActiveObj.id}`;

      let xAxisLabels = [];
      let yAxisValues = [];

      let valuesArray = lineGraphData[keysObj[activeObjKey]];

      if (valuesArray) {
      for (let valueObj of valuesArray) {
        xAxisLabels.push(valueObj[xAxisKey]);
        yAxisValues.push(valueObj.count)
      }

        setValue({
          label:xAxisLabels,
          data:yAxisValues
        });
    } else {
      setValue({
        label:[],
        data:[]
      });
    }
    }

    const data = {
        labels: value.label,
      datasets: [{
          label: '# of Auctions',
          data: value.data,
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
      <Line
        data={data}
        height="340px"
        width="390px"
        options={{
            maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Auction Details"
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