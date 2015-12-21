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

// newData = newData.splice(0, 100);

let xData = newData.map(function (rep) {
  return rep.value;
});

class SquaredChart extends React.Component {
  render() {
    let optionalParamsObject = {
      col1: 'red',
      col2: 'blue',
      rx: 3,
      ry: 3,
      yLabel: 'Amount',
      labelSize: 1,
      aspectRatio: 0.5,
      tooltip: (d) => ('<strong><div>Email: ' + d.email + '</div></strong><br /><strong><div>Amount: $' + d.value.toFixed(2) + '</div></strong>'),
      defaultDuration: 800
    }

    return (
      <Chart
        chartType='bar'
        data={newData}
        paddingBottom={'100%'}
        params={optionalParamsObject} />
    );
  }

}

export default SquaredChart;