import React, { Component } from 'react';
import { connect } from 'dva';
// 引入组件
import OptionList from '@/components/OptionList';
import AccessSpeed from '@/components/GraphHOC/AccessSpeed';
import JsError from '@/components/GraphHOC/JsError';
import ApiSuccess from '@/components/GraphHOC/ApiSuccess';
// 引入服务
import { ConnectProps, ConnectState } from '@/models/connect';
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from '../url/style.less';

interface TerminalContainerProps extends ConnectProps {
  filterStartTime: number;
  filterEndTime: number;
}

class Terminal extends Component<TerminalContainerProps> {
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
    this.handleGetListDataFun('detector.browser.name', this.props);
  }

  componentWillReceiveProps(nextProps: TerminalContainerProps, preState: any) {
    this.handleGetListDataFun('detector.browser.name', nextProps);
  }

  handleGetListDataFun = (paramsName: string, props: TerminalContainerProps) => {
    // 根据筛选参数获取页面列表
    const { filterStartTime, filterEndTime } = props;
    this.handleGetListData(paramsName, {
      intervalMillis: (filterEndTime - filterStartTime) / 7,
      startTime: filterStartTime,
      endTime: filterEndTime,
    });
  };

  handleGetListData = async (paramsName?: string, connectParams?: any) => {
    // 获取列表数据
    const params = connectParams
      ? { ...this.handleAssembleParams('listData', paramsName), ...connectParams }
      : this.handleAssembleParams('listData', paramsName);
    const listDataResult = await getLatitudeData(params);
    const tempResult = listDataResult.data;
    if (listDataResult.code === 200 && tempResult.data.length) {
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
    } else {
      this.setState({
        listData: [],
        listActiveOption: {
          isActive: false,
          name: '',
          resultNum: '',
        },
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
      intervalMillis: (20 * 60 * 60 * 1000) / 7,
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
      this.handleGetListDataFun(tempName, this.props);
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
          {listActiveOption && (
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

export default connect(({ global }: ConnectState) => ({
  filterStartTime: global.filterStartTime,
  filterEndTime: global.filterEndTime,
}))(Terminal);
