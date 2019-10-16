import React, { Component } from 'react';
// 引入样式
import styles from './style.less';

interface GraphConfig {
  title: string;
}

const GraphContainer = (ParamsComponent: any, config: GraphConfig): React.ComponentClass<{}> =>
  class extends Component<{}, {}> {
    handleClick = () => {
      console.log(12);
    };

    render() {
      return (
        <div className={styles.graphContainer}>
          <div className={styles.graphContainerHeader}>
            <span onClick={this.handleClick}>{config.title}</span>
          </div>
          <ParamsComponent {...this.props} />
        </div>
      );
    }
  };

export default GraphContainer;
