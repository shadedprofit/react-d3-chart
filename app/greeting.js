'use strict';

import React from 'react';

let styles = {
  description: {
    color: 'blue',
    fontSize: '24'
  }
}

class Greeting extends React.Component {

  render() {
    return (
      <div className="greeting" style={styles.description}>
        Check out this chart, {this.props.name}!
      </div>
    );
  }
}

export default Greeting;