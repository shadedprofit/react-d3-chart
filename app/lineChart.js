'use strict';

import React from 'react';
import Chart from 'd3-react-squared';
import sampleData from './data.js';

// console.log(sampleData)
// let newData = sampleData.records.map(function (rep, i) {
//     return {
//       x: i,
//       y: rep.amount,
//       period: rep.period
//     };
// });
let periods = {};

// console.log(newData)
for (let i = 0; i < sampleData.records.length; i++) {
  if (periods[sampleData.records[i].period]) {
    periods[sampleData.records[i].period].push({
      x: i,
      y: sampleData.records[i].amount
     
    });
  } else {
    periods[sampleData.records[i].period] = [{
      x: i,
      y: sampleData.records[i].amount
    }];
  }
}

let data = [];
for (let key in periods) {
  data.push({
    id: key.toString(),
    values: periods[key]
  })
}
console.log(data)
// newData.sort(function (a,b) {
//   return a.y - b.y;
// })
// console.log(newData)

// newData = newData.map(function (item, i) {
//   item.x = i + 1;
//   return item;
// });

class LineChart extends React.Component {
  render() {
    let optionalParamsObject = {
      colorArray: d3.scale.category20().range(),
      yLabel: "Amount", 
      strokeWidth: 3,
      labelSize: 1, 

      yAxisPlacement: 'left', 
      interpolate: 'linear', 
      tooltip: (d) => ('<div>Period: ' + d.x + '</div>'), 
      aspectRatio: 0.5, 
    };

    return (
      <Chart
        chartType="line"
        data={data}
        highlight={false}
        paddingBottom='100%'
        params={optionalParamsObject} />
    );
  }
}

export default LineChart;