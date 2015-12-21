'use strict';

import React from 'react';
import Chart from 'd3-react-squared';
import sampleData from './data.js';

let newData = sampleData.records.map(function (rep, i) {
    return {
      id: i,
      email: rep.user.email,
      value: rep.amount
    };
});

newData.sort(function (a,b) {
  return b.value - a.value;
})

newData = newData.map(function (rep, i) {
  rep.id = i + 1;
  return rep;
})

let realData = [];
for (var i=0; i < 5; i++) {
  realData.push(newData[Math.floor(Math.random() * newData.length -1)]);
}

// newData = newData.splice(0, 100);

class PieChart extends React.Component {
  render() {
    let optionsParameters = {
      col1: "green", 
      col2: "orangered", 
      innerRadius: 200, 
      cornerRadius: 5, 
      tooltip: (d) => '<div>Email: ' + d.email + '</div><br /><div>Amount: ' + d.value + '</div>', 
      defaultDuration: 500
    };

    return (
      <Chart
        chartType="pie"
        data={realData}
        params={optionsParameters} />
    );
  }
}

export default PieChart;
