import React, { Component } from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphContainer from '@/components/GraphContainer';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from './style.less';

interface UrlPvUvProps {
  activePage: {
    page: string;
    pv?: string;
    uv?: string;
    active?: boolean;
  };
}
interface UrlPvUvState {
  urlPvUvDataResult: null | {};
  activePageValue: string;
}
interface UrlPvUvData {
  date: number;
  format: string;
  pv: number;
  uv: number;
}
interface GraphUrlPvUvDataResult {
  type: string;
  time: string;
  value: number;
}
class UrlPvUv extends Component<UrlPvUvProps, UrlPvUvState> {
  public state = {
    urlPvUvDataResult: null,
    activePageValue: this.props.activePage.page,
  };

  async componentDidMount() {
    await this.handleUrlPvUvDataResult();
  }

  async componentWillReceiveProps(nextProps: UrlPvUvProps, preState: UrlPvUvState) {
    if (nextProps.activePage.page !== preState.activePageValue) {
      await this.setState(
        { activePageValue: nextProps.activePage.page },
        this.handleUrlPvUvDataResult,
      );
    }
  }

  handleUrlPvUvDataResult = async () => {
    const urlPvUvDataResult = await this.handleGetPvUvData();
    const tempUrlPvUvDataResult: GraphUrlPvUvDataResult[] = [];
    if (urlPvUvDataResult.code === 200) {
      (urlPvUvDataResult.data.allData || urlPvUvDataResult.data.data).forEach(
        (objItem: UrlPvUvData) => {
          const time = this.handleFormatTime(objItem.date);
          tempUrlPvUvDataResult.push(
            {
              type: 'pv',
              time,
              value: objItem.pv,
            },
            {
              type: 'uv',
              time,
              value: objItem.uv,
            },
          );
        },
      );
    }
    this.setState({
      urlPvUvDataResult: tempUrlPvUvDataResult.length ? tempUrlPvUvDataResult : null,
    });
  };

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

  handleGetPvUvData = async () => {
    const params: IGetLatitude = {
      // 组装获取PV/UV图表参数
      metric: 'webstat.url',
      measures: ['pv', 'uv'],
      filters: {
        page: this.state.activePageValue,
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
    const { urlPvUvDataResult } = this.state;
    return (
      <div className={styles.commonGraphHeight}>
        {urlPvUvDataResult && (
          <Chart height={240} data={urlPvUvDataResult} padding="auto" forceFit>
            <Legend position="top-center" />
            <Axis name="time" />
            <Axis name="value" />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom type="line" position="time*value" size={2} color="type" shape="smooth" />
            <Geom
              type="point"
              position="time*value"
              size={4}
              shape="circle"
              color="type"
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        )}
      </div>
    );
  }
}
const urlPvUvConfig = {
  title: 'PV/UV',
};

export default GraphContainer(UrlPvUv, urlPvUvConfig);
