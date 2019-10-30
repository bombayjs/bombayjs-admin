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

interface NetworkProps extends ConnectProps {
  filterStartTime: number;
  filterEndTime: number;
}

class Network extends Component<NetworkProps> {
  public state = {
    listData: [],
    listTitle: '按访问量排行',
    listActiveOption: {
      isActive: false,
      name: '',
      resultNum: '',
    },
  };

  componentDidMount() {
    this.handleGetListDataFun(this.props);
  }

  componentWillReceiveProps(nextProps: NetworkProps, preState: any) {
    this.handleGetListDataFun(nextProps);
  }

  handleGetListDataFun = (props: NetworkProps) => {
    // 根据筛选参数获取页面列表
    const { filterStartTime, filterEndTime } = props;
    this.handleGetListData({
      intervalMillis: (filterEndTime - filterStartTime) / 7,
      startTime: filterStartTime,
      endTime: filterEndTime,
    });
  };

  handleGetListData = async (connectParams?: any) => {
    // 获取列表数据
    const params = connectParams
      ? { ...this.handleAssembleParams(), ...connectParams }
      : this.handleAssembleParams();
    const listDataResult = await getLatitudeData(params);
    const tempResult = listDataResult.data;
    if (listDataResult.code === 200 && tempResult.data.length) {
      const tempListData = tempResult.data.map(
        (listDataResultItem: any, listDataResultIndex: number) => ({
          isActive: listDataResultIndex === 0,
          name: listDataResultItem.ct ? listDataResultItem.ct : 'Null',
          resultNum: `${listDataResultItem.pv} (${(
            (listDataResultItem.pv / tempResult.total) *
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

  handleClickListItem = (listDataItem: any) => {
    // 设置当前列表项
    const { listData } = this.state;
    listData.forEach((listItem: any) => {
      listItem.isActive = listItem.name === listDataItem.name;
    });
    this.setState({ listActiveOption: listDataItem });
  };

  handleAssembleParams = (type?: string) => {
    // 组装不同图表的数据
    let params = {
      metric: 'webstat.url',
      measures: ['pv', 'count'],
      dimensions: ['ct'],
      filters: {},
      intervalMillis: (20 * 60 * 60 * 1000) / 7,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    if (type === 'accessSpeed') {
      params = {
        ...params,
        ...{
          measures: ['avg_fpt', 'avg_tti', 'avg_load', 'avg_ready', 'avg_dom'],
          filters: {
            t: 'perf',
            ct: this.state.listActiveOption.name,
          },
          dimensions: [],
        },
      };
    } else if (type === 'jsError') {
      params = {
        ...params,
        ...{
          measures: ['pv', 'uv', 'count'],
          filters: {
            t: 'error',
            ct: this.state.listActiveOption.name,
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
            ct: this.state.listActiveOption.name,
          },
          dimensions: [],
        },
      };
    } else {
      params = {
        ...params,
        ...{
          startTime: 0,
        },
      };
    }
    return params;
  };

  render() {
    const { listData, listTitle, listActiveOption } = this.state;
    const accessSpeedParams = this.handleAssembleParams('accessSpeed');
    const jsErrorParams = this.handleAssembleParams('jsError');
    const apiSuccessParams = this.handleAssembleParams('apiSuccess');
    return (
      <section className={styles.geographyContainer}>
        {/* 选项列表组件 */}
        <OptionList
          listTitle={listTitle}
          listData={listData}
          handleClickListItem={this.handleClickListItem}
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
}))(Network);
