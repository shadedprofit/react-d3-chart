'use strict';

// import d3 from 'd3';
import React from 'react';
import C3Chart from 'c3-react';
import sampleData from './data.js';
// import ReactFauxDOM from 'react-faux-dom';


let newData = sampleData.records.map(function (rep) {
    return {
      label: rep.user.email,
      value: rep.amount
    };
});

newData.sort(function (a,b) {
  return b.value - a.value;
})

newData = newData.splice(0,30)

console.log(newData);

let styles = {
  chart: {
    margin: 40,
    backgroundColor: 'grey'
  }
};

let data = [
  {
    key: "Amount",
    values: newData
  }
];

let type = "bar"; // {"line","bar","pie", "multiBar","lineBar"}

let options = {
  padding: {
    top: 20,
    bottom: 20,
    left: 40,
    right: 10
  },
  size: {
    width: 1000,
  },
  subchart: false,
  zoom: true,
  grid: {
    x: false,
    y: false
  },
  labels: false,
  axisLabel: {
    x: '',
    y: ''
  },
  onClick: function(d) {
    let categories = this.categories(); //c3 function, get categorical labels
    console.log(d);
    console.log("you clicked {" + categories[d.x] + ": " + d.value + "}");
  },
  toolTip: {
    show: false
  }
};

class C3BarChart extends React.Component {
  render() {
    return (
      <C3Chart data={data} type={type} options={options} />
    );
  }
}

export default C3BarChart;