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

export default class Geography extends Component {
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
    this.handleGetListData();
  }

  handleGetListData = async () => {
    // 获取列表数据
    const params = this.handleAssembleParams();
    const listDataResult = await getLatitudeData(params);
    if (listDataResult.code === 200) {
      const tempResult = listDataResult.data;
      const tempListData = tempResult.data.map(
        (listDataResultItem: any, listDataResultIndex: number) => ({
          isActive: listDataResultIndex === 0,
          name: listDataResultItem['ad_info.nation'],
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
      measures: ['pv', 'uv'],
      dimensions: ['ad_info.nation'],
      filters: {},
      intervalMillis: 4 * 60 * 60 * 1000,
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
            'ad_info.nation': this.state.listActiveOption.name,
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
            'ad_info.nation': this.state.listActiveOption.name,
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
            'ad_info.nation': this.state.listActiveOption.name,
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
