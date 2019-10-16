import React, { Component } from 'react';
// 引入组件
import UrlList from './UrlList';
import UrlContent from './UrlContent';
// 引入样式
import styles from './style.less';
// 引入服务
import { getLatitudeData } from '@/services/latitude';

interface UrlListData {
  page: string;
  pv: string;
  uv: string;
  active?: boolean;
}
interface UrlContainerState {
  // state状态接口
  urlList?: null | {
    data: {
      data: UrlListData;
      total: number;
    };
    code: number;
    message: string;
    success: boolean;
  };
  urlListData: UrlListData[];
  activePage: null | UrlListData;
  urlListTotalNumber: number;
}

class UrlContainer extends Component<{}, UrlContainerState> {
  public state: UrlContainerState = {
    // urlList: null, // URL 页面列表所有数据信息
    urlListData: [], // URL 页面列表展示数据
    activePage: null, // URL 页面当前被选中的选项
    urlListTotalNumber: 0, // URL 页面列表元素个数
  };

  async componentDidMount() {
    const urlPageDataResult = await this.handlegetLatitudeData();
    const urlListData =
      urlPageDataResult.code === 200
        ? this.handleTransformUrlListData(urlPageDataResult.data.data)
        : [];
    const urlListTotalNumber = urlPageDataResult.code === 200 ? urlPageDataResult.data.total : 0;
    this.setState({
      // urlList: urlPageDataResult,
      urlListData,
      urlListTotalNumber,
      activePage: urlListData.length ? urlListData[0] : null,
    });
  }

  handlegetLatitudeData = async () => {
    // 获取页面列表处理
    const params: IGetLatitude = {
      // 组装获取页面列表参数
      metric: 'webstat.url',
      measures: ['pv', 'uv'],
      dimensions: ['page'],
      filters: {},
      intervalMillis: '1m',
      startTime: 1570171354481,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    return getLatitudeData(params);
  };

  handleTransformUrlListData = (urlListData: UrlListData[]) =>
    urlListData.map((urlListDataItem: UrlListData, urlListDataIndex: number) => {
      urlListDataItem.active = urlListDataIndex === 0;
      return urlListDataItem;
    });

  handleClickUrlListData = (str: string) => {
    // 点击列表选项时改变状态
    // let tempUrlListData = this.state.urlListData.map(urlListDataItem => {
    //   urlListDataItem.active = urlListDataItem.page === str ? true : false
    //   return urlListDataItem
    // })
    let tempUrlListDataItem: null | UrlListData = null;
    const { urlListData } = this.state;
    urlListData.forEach(urlListDataItem => {
      if (urlListDataItem.page === str) {
        urlListDataItem.active = true;
        tempUrlListDataItem = urlListDataItem;
      } else {
        urlListDataItem.active = false;
      }
    });
    this.setState({
      urlListData,
      activePage: tempUrlListDataItem,
    });
  };

  render() {
    const { urlListData, urlListTotalNumber, activePage } = this.state;
    return (
      <div className={styles.urlContainer}>
        {urlListData.length && (
          <>
            <UrlList
              urlListData={urlListData}
              urlListTotalNumber={urlListTotalNumber}
              handleClickUrlListData={this.handleClickUrlListData}
            />
            <UrlContent urlListData={urlListData} activePage={activePage} />
          </>
        )}
      </div>
    );
  }
}

export default UrlContainer;
