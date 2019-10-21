import React, { Component } from 'react';
// 引入组件
import { Table } from 'antd';
import GraphContainer from '@/components/GraphContainer';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from './style.less';

interface UrlApiDetailProps {
  activePage: {
    page: string;
    pv?: string;
    uv?: string;
    active?: boolean;
  };
}
interface UrlApiDetailState {
  activePageValue: string;
  urlApiDetailCol: UrlApiDetailCol[];
  urlApiDetailData: null | UrlApiDetailData[];
}
interface UrlApiDetailCol {
  title: string;
  dataIndex: string;
  width?: number;
}
interface UrlApiDetailData {
  key: number;
  url: string;
  count: number;
  avg_time: string;
}

class UrlApiDetail extends Component<UrlApiDetailProps, UrlApiDetailState> {
  public state = {
    activePageValue: this.props.activePage.page,
    urlApiDetailCol: [
      { title: 'API 名称', dataIndex: 'url' },
      { title: '请求次数', dataIndex: 'count', width: 90 },
      { title: '平均耗时', dataIndex: 'avg_time', width: 90 },
    ],
    urlApiDetailData: [],
  };

  async componentDidMount() {
    await this.handleUrlApiDetailResult();
  }

  async componentWillReceiveProps(nextProps: UrlApiDetailProps, preState: UrlApiDetailState) {
    if (nextProps.activePage.page !== preState.activePageValue) {
      await this.setState(
        { activePageValue: nextProps.activePage.page },
        this.handleUrlApiDetailResult,
      );
    }
  }

  handleUrlApiDetailResult = async () => {
    const urlApiDetailResult = await this.handleGetUrlApiDetail();
    const urlApiDetailData: UrlApiDetailData[] = [];
    if (urlApiDetailResult.code === 200) {
      urlApiDetailResult.data.data.forEach((objItem: UrlApiDetailData, objIndex: number) => {
        urlApiDetailData.push({
          key: objIndex + 1,
          url: objItem.url,
          count: objItem.count,
          avg_time: `${(Number(objItem.avg_time) / 1000).toFixed(2)}s`,
        });
      });
    }
    this.setState({ urlApiDetailData });
  };

  handleGetUrlApiDetail = async () => {
    const params: IGetLatitude = {
      // 组装获取API 详情图表参数
      metric: 'webstat.url',
      measures: ['count', 'avg_time'],
      filters: {
        page: this.state.activePageValue,
        t: 'api',
      },
      dimensions: ['url'],
      intervalMillis: 4 * 60 * 60 * 1000,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    return getLatitudeData(params);
  };

  render() {
    const { urlApiDetailCol, urlApiDetailData } = this.state;
    return (
      <div className={styles.commonGraphHeight}>
        <Table columns={urlApiDetailCol} dataSource={urlApiDetailData} pagination={false} />
      </div>
    );
  }
}

const UrlApiDetailConfig = {
  title: 'API 详情',
};

export default GraphContainer(UrlApiDetail, UrlApiDetailConfig);
