import React, { Component } from 'react';
import moment from 'moment';
// 引入组件
import { Spin, Icon } from 'antd';
import SelectDatetime from '../SelectDatetime';
// 引入样式
import styles from './style.less';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
import { dateRangeDict } from '@/utils/helper';

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
interface GraphState {
  graphData: ILatitudeData | null;
  activeOptionName: string;
  isLoading: boolean;
  dateRange: string;
}

const GraphHOC = (config: GraphConfig) => (ParamsComponent: AnyComponent) => {
  class HOCComponent extends Component<GraphProps, GraphState> {
    public config: GraphConfig = config;

    public state: GraphState = {
      graphData: null,
      activeOptionName: this.props.activeOptionName,
      isLoading: false,
      dateRange: '',
    };

    componentDidMount() {
      this.handleGraphData();
    }

    async componentWillReceiveProps(nextProps: GraphProps, preState: any) {
      if (nextProps.activeOptionName !== this.props.activeOptionName) {
        await this.setState({ activeOptionName: nextProps.activeOptionName, dateRange: '' });
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

    handleGraphData = async (params?: any) => {
      const { graphParams } = this.props;
      this.setState({ isLoading: true });
      const graphData = await getLatitudeData(params ? { ...graphParams, ...params } : graphParams);
      this.setState({ graphData, isLoading: false });
    };

    handleDateRange = (type: string | [string, string]) => {
      let begin: any;
      let end: any;
      let params;
      switch (type) {
        case '30m':
          begin = moment().add(-30, 'minutes');
          break;
        case '4h':
          begin = moment().add(-4, 'hours');
          break;
        case '24h':
          begin = moment().add(-24, 'hours');
          break;
        case '3D':
          begin = moment().add(-3, 'days');
          break;
        case '7D':
          begin = moment().add(-7, 'days');
          break;
        case '1M':
          begin = moment().add(-1, 'months');
          break;
        case '6M':
          begin = moment().add(-6, 'months');
          break;
        case '1Y':
          begin = moment().add(-1, 'years');
          break;
        case 'today':
          begin = moment().startOf('date');
          break;
        case 'lastday':
          begin = moment()
            .add(-1, 'days')
            .startOf('date');
          end = moment()
            .add(-1, 'days')
            .endOf('date');
          params = {
            intervalMillis: (end.valueOf() - begin.valueOf()) / 7,
            startTime: begin.valueOf(),
            endTime: end.valueOf(),
          };
          break;
        case 'thisweek':
          begin = moment()
            .weekday(0)
            .startOf('date');
          this.setState({ dateRange: '本周' });
          break;
        case 'thismonth':
          begin = moment()
            .month(moment().month())
            .date(1)
            .startOf('date');
          break;
        case 'lastmonth':
          begin = moment()
            .month(moment().month() - 1)
            .date(1)
            .startOf('date');
          end = moment()
            .month(moment().month())
            .date(1)
            .startOf('date');
          params = {
            intervalMillis: (end.valueOf() - begin.valueOf()) / 7,
            startTime: begin.valueOf(),
            endTime: end.valueOf(),
          };
          this.setState({ dateRange: '上月' });
          break;
        case 'thisyear':
          begin = moment()
            .year(moment().year())
            .month(0)
            .date(1)
            .startOf('date');
          break;
        case 'lastyear':
          begin = moment()
            .year(moment().year() - 1)
            .month(0)
            .date(1)
            .startOf('date');
          end = moment()
            .year(moment().year())
            .month(0)
            .date(1)
            .startOf('date');
          params = {
            intervalMillis: (end.valueOf() - begin.valueOf()) / 7,
            startTime: begin.valueOf(),
            endTime: end.valueOf(),
          };
          break;
        default:
          [begin, end] = type;
          params = {
            intervalMillis: (new Date(end).getTime() - new Date(begin).getTime()) / 7,
            startTime: new Date(begin).getTime(),
            endTime: new Date(end).getTime(),
          };
          break;
      }
      if (typeof type === 'string' && dateRangeDict[type]) {
        this.setState({ dateRange: dateRangeDict[type] });
      } else {
        this.setState({ dateRange: `${type[0]} 至 ${type[1]}` });
      }
      params = params || {
        intervalMillis: (moment().valueOf() - begin.valueOf()) / 7,
        startTime: begin.valueOf(),
      };
      this.handleGraphData(params);
    };

    render() {
      const { graphData, isLoading, dateRange } = this.state;
      const tempComponent =
        graphData && (graphData as ILatitudeData).data.total ? (
          <ParamsComponent {...this.state} handleFormatTime={this.handleFormatTime} />
        ) : (
          <div className={styles.graphContainerNoData}>
            <div>
              <Icon type="file-search" style={{ fontSize: '42px' }} />
              <p>暂无数据</p>
            </div>
          </div>
        );
      return (
        <div className={styles.graphContainer}>
          {/* 图表头部设置项 */}
          <div className={styles.graphContainerHeader}>
            <span>{this.config.graphTitle}</span>
            <div className={styles.graphHeaderConfig}>
              <SelectDatetime dateRange={dateRange} setDateRange={this.handleDateRange}>
                <div className={styles.graphCommonSelect}>
                  <Icon type="clock-circle" /> {dateRange}
                </div>
              </SelectDatetime>
            </div>
          </div>
          {/* 图表内容设置项 */}
          <div className={styles.graphContainerContent}>
            {isLoading ? (
              <Spin size="large" className={styles.graphContainerSpin} />
            ) : (
              tempComponent
            )}
          </div>
        </div>
      );
    }
  }
  return HOCComponent;
};

export default GraphHOC;
