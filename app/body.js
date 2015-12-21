'use strict';

import React from 'react';
import Chart from './chart.js';
import FauxChart from './fauxChart.js';
import SquaredChart from './reactSquaredChart.js';
import PieChart from './pieChart.js';
import LineChart from './lineChart.js';
import FauxLineChart from './fauxC3LineChart.js';
import RealLineChart from './realC3LineChart.js';
import RealBarChart from './realD3BarChart.js';
import sampleData from './data.js';

let ytd = {};

for (let i = 0; i < sampleData.records.length; i++) {
  if (ytd[sampleData.records[i].period]) {
    ytd[sampleData.records[i].period].push(sampleData.records[i].amount);
  } else {
    ytd[sampleData.records[i].period] = [sampleData.records[i].amount];
  }
}

let data = [];

for (let key in ytd) {
  ytd[key].unshift(key);
  data.push(ytd[key]);
}

let newData = sampleData.records.map(function (rep, i) {
    return {
      label: i,
      value: rep.amount,
      email: rep.user.email
    };
});

newData.sort(function (a,b) {
  return b.value - a.value;
})

newData = newData.splice(0, 30);

newData = newData.map(function (item, i) {
    item.label = i;
    return item;
})


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data[0],
      bardata: newData
    }
  }

  render() {
    return (
      <div>
        <h2>C3 Bar Chart</h2>
        <Chart />
        <h2>Faux DOM Bar Chart</h2>
        <FauxChart />
        <h2>D3 React Squared Bar Chart</h2>
        <SquaredChart />
        <h2>Real C3 Line Chart</h2>
        <RealLineChart 
          data={this.state.data} />
        <h2>Real D3 Bar Chart</h2>
        <RealBarChart
          bardata={this.state.bardata} />
        <h2>D3 React Squared Pie Chart</h2>
        <PieChart />
      </div>
    );
  }
}

export default App;