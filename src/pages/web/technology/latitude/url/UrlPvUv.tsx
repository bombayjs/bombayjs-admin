import React, { Component } from 'react';
// 引入组件
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import GraphContainer from '@/components/GraphContainer';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from './style.less';

interface UrlListData {
  page: string;
  pv?: string;
  uv?: string;
  active?: boolean;
}
interface UrlPvUvProps {
  activePage: UrlListData;
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
      urlPvUvDataResult.data.data.forEach((objItem: UrlPvUvData) => {
        tempUrlPvUvDataResult.push(
          {
            type: 'pv',
            time: objItem.format.slice(5, 16),
            value: objItem.pv,
          },
          {
            type: 'uv',
            time: objItem.format.slice(5, 16),
            value: objItem.uv,
          },
        );
      });
    }
    this.setState({
      urlPvUvDataResult: tempUrlPvUvDataResult.length ? tempUrlPvUvDataResult : null,
    });
  };

  handleGetPvUvData = async () => {
    const params: IGetLatitude = {
      // 组装获取PV/UV图表参数
      metric: 'webstat.url',
      measures: ['pv', 'uv'],
      filters: {
        page: this.state.activePageValue,
      },
      intervalMillis: '30m',
      startTime: new Date().getTime() - 10 * 60 * 60 * 1000,
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
