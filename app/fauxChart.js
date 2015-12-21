'use strict';

import d3 from 'd3';
// import d3Tip from 'd3-tip';
// import c3 from 'c3';
import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import sampleData from './data.js';
import numeral from 'numeral';
// import Immutable from 'immutable';

import '../dist/css.css';



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


class FauxChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: newData,
        hoverIdx: -1,
        display: 'hidden',
        email: '',
        amount: ''
    };
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  onMouseMove(event) {
    this.setState({
        pageX: event.pageX,
        pageY: event.pageY
    });
  }


  render() {
    const { data, hoverIdx } = this.state;

    const height = 400;
    const width = 600;
    const barWidth = width / data.length;

    const x = d3.scale.linear()
        .range([0, width])
        .domain([data[data.length-1].value, d3.max(data, function (d, i) { return i + 1; })])

    const y = d3.scale.linear()
        .range([0, height - 10])
        .domain([d3.max(data, function(d) { return d.value }), data[data.length-1].value]);

    const chart = d3.select(ReactFauxDOM.createElement('svg'))
        .attr('width', width)
        .attr('height', height);

    const bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${i * barWidth}, -100)`)
        // .call(tip)


    // tooltip element will be invisible by default
    let tooltip = chart.append('div')
                    .attr('class', 'tooltip')
                    .style('visibility', this.state.display)
                    .style('left', this.state.pageX + 'px')
                    .style('top', this.state.pageY + 'px');

    d3.select('.tooltip')
        .html('<strong><div>Email: ' + this.state.email + '</div></strong><br /><strong><div>Amount: $' + this.state.amount + '</div></strong>');

    bar.append('rect')
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .attr('width', barWidth - 1)
        .attr('fill', (d, i) => i === hoverIdx ? 'blue' : 'red')
        .on('mouseover', (d, i) => {
            this.setState({ 
                display: 'visible',
                hoverIdx: i,
                email: d.email,
                amount: d.value.toFixed(2)
            });

        })
        .on('mouseout', d => {
            this.setState({ hoverIdx: -1 });
            this.setState({ display: 'hidden' });
            console.log('out');
            // tooltip.transition()
            //     .duration(200)
            //     .style('opacity', 0);
        });


    return chart.node().toReact();

  }
}

export default FauxChart;