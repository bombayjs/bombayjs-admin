import React, { Component } from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphContainer from '@/components/GraphContainer';
// 引入样式
import styles from './style.less';
// 引入服务
import { getLatitudeData } from '@/services/latitude';

interface UrlJsErrorProps {
  activePage: {
    page: string;
    pv?: string;
    uv?: string;
    active?: boolean;
  };
}
interface UrlJsErrorState {
  urlJsErrorData: null | UrlJsErrorData[];
  activePageValue: string;
}
interface UrlJsErrorData {
  date: number | string;
  format: string;
  count: number;
  pv: number;
}

class UrlJsError extends Component<UrlJsErrorProps, UrlJsErrorState> {
  public state = {
    urlJsErrorData: null,
    activePageValue: this.props.activePage.page,
  };

  async componentDidMount() {
    await this.handleJsErrorResult();
  }

  async componentWillReceiveProps(nextProps: UrlJsErrorProps, preState: UrlJsErrorState) {
    if (nextProps.activePage.page !== preState.activePageValue) {
      await this.setState({ activePageValue: nextProps.activePage.page }, this.handleJsErrorResult);
    }
  }

  handleJsErrorResult = async () => {
    const urlJsErrorDataResult = await this.handleGetJsErrorData();
    if (urlJsErrorDataResult.code === 200) {
      (urlJsErrorDataResult.data.allData || urlJsErrorDataResult.data.data).forEach(
        (objItem: UrlJsErrorData) => {
          objItem.date = this.handleFormatTime(objItem.date);
        },
      );
      this.setState({ urlJsErrorData: urlJsErrorDataResult.data.allData });
    }
  };

  handleFormatTime = (time: number | string): string => {
    const date = new Date(time);
    const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
    const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return h + m;
  };

  handleGetJsErrorData = async () => {
    const params: IGetLatitude = {
      // 组装获取PV/UV图表参数
      metric: 'webstat.url',
      measures: ['count', 'pv'],
      filters: {
        page: this.state.activePageValue,
        t: 'error',
      },
      intervalMillis: 4 * 60 * 60 * 1000,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    return getLatitudeData(params);
  };

  render() {
    const { urlJsErrorData } = this.state;
    let chartIns: any;
    return (
      <div className={styles.commonGraphHeight}>
        <span>{chartIns}</span>
        <Chart
          height={240}
          data={urlJsErrorData}
          padding="auto"
          forceFit
          onGetG2Instance={chart => {
            chartIns = chart;
          }}
        >
          <Legend
            position="top-center"
            allowAllCanceled
            items={[
              {
                value: 'count',
                marker: {
                  symbol: 'square',
                  fill: '#bbb',
                  radius: 4,
                },
              },
              {
                value: 'pv',
                marker: {
                  symbol: 'hyphen',
                  stroke: '#1890ff',
                  radius: 5,
                  lineWidth: 3,
                },
              },
            ]}
          />
          <Axis name="pv" />
          <Tooltip />
          <Geom type="interval" position="date*count" color="#bbb" />
          <Geom type="line" position="date*pv" size={2} shape="smooth" />
          <Geom type="point" position="date*pv" size={4} shape="circle" />
        </Chart>
      </div>
    );
  }
}

const urlJsErrorConfig = {
  title: 'JS 错误率',
};

export default GraphContainer(UrlJsError, urlJsErrorConfig);
