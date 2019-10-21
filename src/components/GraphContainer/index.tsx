import React, { Component } from 'react';
// 引入样式
import styles from './style.less';

interface GraphConfig {
  title: string;
}

interface GraphProps {
  activePage?: {
    page: string;
    pv?: string;
    uv?: string;
    active?: boolean;
  };
}

type AnyComponent<P = any> =
  | (new (props: P) => React.Component)
  | ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);

const GraphContainer = (
  ParamsComponent: AnyComponent,
  config: GraphConfig,
): React.ComponentClass<GraphProps> =>
  class extends Component<GraphProps> {
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
