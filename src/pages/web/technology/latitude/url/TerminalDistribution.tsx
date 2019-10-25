import React, { Component } from 'react';
// 引入组件
import { Tabs, Table } from 'antd';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import GraphHOCC from '@/components/GraphHOC';
// 引入服务
import { getLatitudeData } from '@/services/latitude';
// 引入样式
import styles from './style.less';

const { TabPane } = Tabs;

class TerminalDistribution extends Component<any> {
  public state = {
    initalTabConfig: [
      { name: 'detector.browser.name', title: '浏览器' },
      { name: 'detector.os.name', title: '操作系统' },
      { name: 'detector.device.name', title: '设备' },
      { name: 'sr', title: '分辨率' },
    ],
    terminalDistributionData: [],
    terminalDistributionCol: [],
    currentContentMsg: null,
  };

  componentDidMount() {
    this.handleTerminalDistributionDataAndCol();
  }

  async componentWillReceiveProps(nextProps: any, preState: any) {
    if (nextProps.activeOptionName !== this.props.activeOptionName) {
      this.handleTerminalDistributionDataAndCol();
    }
  }

  handleTerminalDistributionDataAndCol = async (
    type: string = 'detector.browser.name',
    isTab?: boolean,
  ) => {
    const tempTerminalDistributionData: any[] = [];
    const tempGraphData = !isTab
      ? this.props.graphData
      : await this.handleUrlTerminalDistribution(type);

    this.setState((preState: any) => {
      const initTableConfig = preState.initalTabConfig.filter(
        (tabItem: any) => tabItem.name === type,
      );
      tempGraphData.data.data.forEach((propsDataItem: any) => {
        tempTerminalDistributionData.push({
          key: propsDataItem[type],
          type: propsDataItem[type],
          pv: propsDataItem.pv,
          pvPer: propsDataItem.pv / tempGraphData.data.total,
          pvPerStr: `${(propsDataItem.pv / tempGraphData.data.total) * 100}%`,
        });
      });
      return {
        terminalDistributionData: tempTerminalDistributionData,
        terminalDistributionCol: [
          { title: initTableConfig[0].title, dataIndex: 'type' },
          { title: '访问量(pv)', dataIndex: 'pv', width: 150 },
          { title: '占比', dataIndex: 'pvPerStr', width: 100 },
        ],
        currentContentMsg: (
          <Chart
            height={240}
            className={styles.commonTabFloatStyle}
            data={tempTerminalDistributionData}
            padding="auto"
            forceFit
          >
            <Coord type="theta" radius={0.75} />
            <Axis name="pvPer" />
            <Legend position="right-center" offsetX={-100} />
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="pvPer"
              color="type"
              tooltip="type*pvPer"
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            ></Geom>
          </Chart>
        ),
      };
    });
  };

  handleUrlTerminalDistribution = async (type: string) => {
    const params: IGetLatitude = {
      metric: 'webstat.url',
      measures: ['pv', 'uv'],
      filters: {
        page: this.props.activeOptionName,
        t: 'pv',
      },
      dimensions: [type],
      intervalMillis: 4 * 60 * 60 * 1000,
      startTime: new Date().getTime() - 20 * 60 * 60 * 1000,
      endTime: new Date().getTime(),
      orderBy: 'pv',
      order: 'DESC',
    };
    return getLatitudeData(params);
  };

  handleTabContent = (targetTitle: string) => {
    const currentTab = this.state.initalTabConfig.filter(
      (tabConfigItem: any) => tabConfigItem.title === targetTitle,
    )[0];
    this.handleTerminalDistributionDataAndCol(currentTab.name, true);
  };

  render() {
    const {
      initalTabConfig,
      terminalDistributionData,
      terminalDistributionCol,
      currentContentMsg,
    } = this.state;
    return (
      <div className={styles.commonGraphHeight}>
        <Tabs defaultActiveKey="0" onChange={this.handleTabContent}>
          {initalTabConfig.map((tabItem, tabIndex) => (
            <TabPane
              tab={tabItem.title}
              key={`${tabItem.title}`}
              className={styles.commonTabContent}
            >
              {currentContentMsg}
              <Table
                className={styles.commonTabFloatStyle}
                columns={terminalDistributionCol}
                dataSource={terminalDistributionData}
                pagination={false}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default GraphHOCC({
  graphTitle: '终端分布',
})(TerminalDistribution);
