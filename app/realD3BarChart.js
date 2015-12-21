'use strict';

import React from 'react';
import d3Tip from 'd3-tip';
import d3 from 'd3';

d3.tip = d3Tip;

class RealBarChart extends React.Component {
  componentDidMount() {
    this._renderBarChart(this.props.bardata)
  }

  componentWillReceiveProps(newProps) {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    x.domain(newProps.bardata.map(function(d, i) { return i; }));
    y.domain([0, d3.max(newProps.bardata, function(d) { return d.value; })]);

    this.chart.selectAll('rect')
      .data(newProps.bardata)
      .transition()
      .duration(300)
      .attr("x", function(d,i) { return x(i); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand())
  }

  _renderBarChart(data) {
    var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Frequency:</strong> <span style='color:red'>" + d.value + "</span>";
      })

    this.chart = d3.select("#realBarChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.chart.call(tip);

    x.domain(data.map(function(d, i) { return i; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    this.chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    this.chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    this.chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return x(i); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

  }

  render() {
    return (
      <div id="realBarChart"></div>
    )
  }
}

export default RealBarChart;