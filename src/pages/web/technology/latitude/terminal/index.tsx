import React, { Component } from 'react';
// 引入组件
import OptionList from '@/components/OptionList';
import AccessSpeed from '@/components/GraphHOC/AccessSpeed';
import JsError from '@/components/GraphHOC/JsError';
import ApiSuccess from '@/components/GraphHOC/ApiSuccess';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from '../url/style.less';

export default class Terminal extends Component {
  public state = {
    listData: [],
    listTitle: '按访问量排行',
    listActiveOption: {
      isActive: false,
      name: '',
      resultNum: '',
    },
    listTabConfig: [
      { name: 'detector.browser.name', title: '浏览器' },
      { name: 'detector.os.name', title: '操作系统' },
      { name: 'detector.device.name', title: '设备' },
      { name: 'sr', title: '分辨率' },
    ],
    listActiveTabName: 'detector.browser.name',
  };

  componentDidMount() {
    this.handleGetListData('detector.browser.name');
  }

  handleGetListData = async (paramsName?: string) => {
    // 获取列表数据
    const params = this.handleAssembleParams('listData', paramsName);
    const listDataResult = await getLatitudeData(params);
    if (listDataResult.code === 200) {
      const tempResult = listDataResult.data;
      const tempListData = tempResult.data.map(
        (listDataResultItem: any, listDataResultIndex: number) => ({
          isActive: listDataResultIndex === 0,
          name: listDataResultItem[paramsName as string],
          resultNum: `${listDataResultItem.count} (${(
            (listDataResultItem.count / tempResult.total) *
            100
          ).toFixed(2)}%)`,
        }),
      );
      this.setState({
        listData: tempListData,
        listActiveOption: tempListData[0],
      });
    }
  };

  handleAssembleParams = (type?: string, paramsName?: string) => {
    // 组装不同图表的数据
    let params = {
      metric: 'webstat.url',
      measures: ['count'],
      dimensions: ['detector.browser.name'],
      filters: {},
      intervalMillis: 4 * 60 * 60 * 1000,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    if (type === 'listData') {
      params = {
        ...params,
        ...{
          dimensions: [paramsName as string],
        },
      };
    } else if (type === 'accessSpeed') {
      params = {
        ...params,
        ...{
          measures: ['avg_fpt', 'avg_tti', 'avg_load', 'avg_ready', 'avg_dom'],
          filters: {
            t: 'perf',
            [paramsName as string]: this.state.listActiveOption.name,
          },
          dimensions: [],
        },
      };
    } else if (type === 'apiSuccess') {
      params = {
        ...params,
        ...{
          measures: ['sum_apisucc', 'sum_apifail'],
          filters: {
            t: 'health',
            [paramsName as string]: this.state.listActiveOption.name,
          },
          dimensions: [],
        },
      };
    } else {
      params = {
        ...params,
        ...{
          measures: ['pv', 'uv', 'count'],
          filters: {
            t: 'error',
            [paramsName as string]: this.state.listActiveOption.name,
          },
          dimensions: [],
        },
      };
    }
    return params;
  };

  handleClickListItem = (listDataItem: any) => {
    // 设置当前列表项
    const { listData } = this.state;
    listData.forEach((listItem: any) => {
      listItem.isActive = listItem.name === listDataItem.name;
    });
    this.setState({ listActiveOption: listDataItem });
  };

  handleClickTabItem = (listTabItem: any) => {
    this.setState((preState: any) => {
      const tempName = preState.listTabConfig.filter(
        (listTabConfigItem: any) => listTabConfigItem.title === listTabItem,
      )[0].name;
      this.handleGetListData(tempName);
      return {
        ...preState,
        listActiveTabName: tempName,
      };
    });
  };

  render() {
    const { listData, listTitle, listActiveOption, listTabConfig, listActiveTabName } = this.state;
    const accessSpeedParams = this.handleAssembleParams('accessSpeed', listActiveTabName);
    const jsErrorParams = this.handleAssembleParams('jsError', listActiveTabName);
    const apiSuccessParams = this.handleAssembleParams('apiSuccess', listActiveTabName);
    return (
      <section className={styles.geographyContainer}>
        {/* 选项列表组件 */}
        <OptionList
          isNeedTab
          listTitle={listTitle}
          listData={listData}
          listTabConfig={listTabConfig}
          handleClickListItem={this.handleClickListItem}
          handleClickTabItem={this.handleClickTabItem}
        />
        {/* 图表内容 */}
        <div className={styles.geographyContent}>
          {listActiveOption.name && (
            <>
              <AccessSpeed
                graphParams={accessSpeedParams}
                activeOptionName={listActiveOption.name}
              />
              <JsError graphParams={jsErrorParams} activeOptionName={listActiveOption.name} />
              <ApiSuccess graphParams={apiSuccessParams} activeOptionName={listActiveOption.name} />
            </>
          )}
        </div>
      </section>
    );
  }
}
