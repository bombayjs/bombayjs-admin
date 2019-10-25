import React from 'react';
// 引入组件
import { Table } from 'antd';
import GraphHOCC from '@/components/GraphHOC';

function JsErrorCluster(props: any) {
  const jsErrorClusterData: any[] = [];
  const jsErrorClusterCol: any[] = [
    { title: 'Msg', dataIndex: 'msg' },
    { title: '错误次数', dataIndex: 'count', width: 90 },
    { title: 'UV', dataIndex: 'uv', width: 90 },
  ];
  props.graphData.data.data.forEach((propsDataItem: any, propsDataIndex: number) => {
    jsErrorClusterData.push({
      key: propsDataIndex + 1,
      msg: propsDataItem.msg,
      count: propsDataItem.count,
      uv: propsDataItem.uv,
    });
  });
  return <Table columns={jsErrorClusterCol} dataSource={jsErrorClusterData} pagination={false} />;
}

export default GraphHOCC({
  graphTitle: 'JS 错误聚类',
})(JsErrorCluster);
