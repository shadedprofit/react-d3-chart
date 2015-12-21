'use strict';

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import c3 from 'c3';
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

class FauxLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data[0]
    };
  }

  render() {
    console.log(this.state.data);
    let fakeNode = d3.select(ReactFauxDOM.createElement('svg'))
                .attr('height', '400px')
                .attr('width', '600px')
                .attr('id', 'fauxLine');
    // let fakeNode = ReactFauxDOM.createElement('svg')
    
    // d3.select(fakeNode).append('div')
    //   .attr('id', 'fauxLine');

    let chart = c3.generate({
      bindto: '#fauxLine',
      data: {
        columns: [
          this.state.data
        ]
      }
    })

    return fakeNode.node().toReact();
  }
}

export default FauxLineChart;