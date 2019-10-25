import React, { Component } from 'react';
// 引入样式
import styles from './style.less';
// 引入服务
import { getLatitudeData } from '@/services/latitude';

type AnyComponent<P = any> =
  | (new (props: P) => React.Component)
  | ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);
interface GraphConfig {
  graphTitle: string;
}
interface GraphProps {
  graphParams: IGetLatitude;
  activeOptionName: string;
}

const GraphHOC = (config: GraphConfig) => (ParamsComponent: AnyComponent) => {
  class HOCComponent extends Component<GraphProps> {
    public config: GraphConfig = config;

    public state = {
      graphData: null,
      activeOptionName: this.props.activeOptionName,
    };

    componentDidMount() {
      this.handleGraphData();
    }

    async componentWillReceiveProps(nextProps: GraphProps, preState: any) {
      if (nextProps.activeOptionName !== this.props.activeOptionName) {
        await this.setState({ activeOptionName: nextProps.activeOptionName });
        this.handleGraphData();
      }
    }

    handleFormatTime = (time: number): string => {
      // 格式化时间处理
      const date = new Date(time);
      const Y = `${date.getFullYear()}-`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
      const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
      const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
      const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
      const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      const tempDate = Y + M + D + h + m + s;
      return tempDate.slice(5, 16);
    };

    handleGraphData = async () => {
      const { graphParams } = this.props;
      const graphData = await getLatitudeData(graphParams);
      this.setState({ graphData });
    };

    render() {
      const { graphData } = this.state;
      return (
        <div className={styles.graphContainer}>
          {/* 图表头部设置项 */}
          <div className={styles.graphContainerHeader}>
            <span>{this.config.graphTitle}</span>
          </div>
          {/* 图表内容设置项 */}
          <div className={styles.graphContainerContent}>
            {graphData && (
              <ParamsComponent {...this.state} handleFormatTime={this.handleFormatTime} />
            )}
          </div>
        </div>
      );
    }
  }
  return HOCComponent;
};

export default GraphHOC;
