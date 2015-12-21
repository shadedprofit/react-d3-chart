'use strict';

import React from 'react';
import c3 from 'c3';


class RealLineChart extends React.Component {

  componentDidMount() {
    this._renderChart(this.props.data);
  }

  componentWillReceiveProps(newProps) {
    this.chart.load({
      columns: [newProps.data]
    })
  }

  _renderChart(data) {
    this.chart = c3.generate({
      bindto: '#realLineChart',
      data: {
        columns: [
          data
        ],
        type: 'line'
      }
    })
  }


  render() {
    return (
      <div id="realLineChart"></div>
    );
  }
}

export default RealLineChart;