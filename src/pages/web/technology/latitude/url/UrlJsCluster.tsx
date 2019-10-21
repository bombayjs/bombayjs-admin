import React, { Component } from 'react';
// 引入组件
import { Table } from 'antd';
import GraphContainer from '@/components/GraphContainer';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from './style.less';

interface UrlJsClusterProps {
  activePage: {
    page: string;
    pv?: string;
    uv?: string;
    active?: boolean;
  };
}
interface UrlJsClusterState {
  activePageValue: string;
  jsClusterCol: JsClusterCol[];
  jsClusterData: JsClusterData[];
}
interface JsClusterCol {
  title: string;
  dataIndex: string;
  width?: number;
}
interface JsClusterData {
  key?: number;
  msg: string;
  count: number;
  uv: number;
}

class UrlJsCluster extends Component<UrlJsClusterProps, UrlJsClusterState> {
  public state = {
    activePageValue: this.props.activePage.page,
    jsClusterCol: [
      { title: 'Msg', dataIndex: 'msg' },
      { title: '错误次数', dataIndex: 'count', width: 90 },
      { title: 'UV', dataIndex: 'uv', width: 90 },
    ],
    jsClusterData: [],
  };

  async componentDidMount() {
    await this.handleUrlJsClusterDataResult();
  }

  async componentWillReceiveProps(nextProps: UrlJsClusterProps, preState: UrlJsClusterState) {
    if (nextProps.activePage.page !== preState.activePageValue) {
      await this.setState(
        { activePageValue: nextProps.activePage.page },
        this.handleUrlJsClusterDataResult,
      );
    }
  }

  handleUrlJsClusterDataResult = async () => {
    // 处理Js错误聚类数据
    const urlJsClusterDataResult = await this.handleGetJsClusterData();
    const tempJsClusterData: any[] = [];
    if (urlJsClusterDataResult.code === 200) {
      (urlJsClusterDataResult.data.allData || urlJsClusterDataResult.data.data).forEach(
        (objItem: JsClusterData, objIndex: number) => {
          tempJsClusterData.push({
            key: objIndex + 1,
            msg: objItem.msg,
            count: objItem.count,
            uv: objItem.uv,
          });
        },
      );
    }
    this.setState({ jsClusterData: tempJsClusterData });
  };

  handleGetJsClusterData = async () => {
    const params: IGetLatitude = {
      // 组装获取PV/UV图表参数
      metric: 'webstat.url',
      measures: ['count', 'uv'],
      filters: {
        page: this.state.activePageValue,
        t: 'error',
      },
      dimensions: ['msg'],
      intervalMillis: 4 * 60 * 60 * 1000,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    return getLatitudeData(params);
  };

  render() {
    const { jsClusterCol, jsClusterData } = this.state;
    return (
      <div className={styles.commonGraphHeight}>
        <Table columns={jsClusterCol} dataSource={jsClusterData} pagination={false} />
      </div>
    );
  }
}

const urlJsClusterConfig = {
  title: 'JS 错误聚类',
};

export default GraphContainer(UrlJsCluster, urlJsClusterConfig);
