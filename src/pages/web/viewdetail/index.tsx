import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import { Dispatch } from 'redux';
import { Tabs } from 'antd';
import AllLog from './AllLog';

import styles from './styles.less';

// const viewDetail = function (props) {
//   return <div>viewDetail</div>
// }

class ViewDetail extends PureComponent {
  changeTag = (key: string) => {
    console.log(key);
  };

  render() {
    const { TabPane } = Tabs;
    return (
      <div className={styles.viewdetal_container}>
        <Tabs defaultActiveKey="1" onChange={this.changeTag}>
          <TabPane tab="全部日志" key="1">
            <AllLog />
          </TabPane>
          <TabPane tab="Js错误日志" key="2">
            <div>Content of Tab Pane 2</div>
          </TabPane>
          <TabPane tab="API日志" key="3">
            <div>Content of Tab Pane 3</div>
          </TabPane>
          <TabPane tab="页面性能日志" key="4">
            <div>Content of Tab Pane 4</div>
          </TabPane>
          <TabPane tab="PV日志" key="5">
            <div>Content of Tab Pane 5</div>
          </TabPane>
        </Tabs>
      </div>
      // <div>
      //   <div>viewDetail</div>
      // </div>
    );
  }
}

export default ViewDetail;
