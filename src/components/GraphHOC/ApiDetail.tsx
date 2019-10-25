import React from 'react';
// 引入组件
import { Table } from 'antd';
import GraphHOCC from '@/components/GraphHOC';

function ApiDetail(props: any) {
  const apiDetailData: any[] = [];
  const apiDetailCol: any[] = [
    { title: 'API 名称', dataIndex: 'url' },
    { title: '请求次数', dataIndex: 'count', width: 90 },
    { title: '平均耗时', dataIndex: 'avg_time', width: 90 },
  ];
  props.graphData.data.data.forEach((propsDataItem: any, propsDataIndex: number) => {
    apiDetailData.push({
      key: propsDataIndex + 1,
      url: propsDataItem.url,
      count: propsDataItem.count,
      avg_time: `${(Number(propsDataItem.avg_time) / 1000).toFixed(2)}s`,
    });
  });
  return <Table columns={apiDetailCol} dataSource={apiDetailData} pagination={false} />;
}

export default GraphHOCC({
  graphTitle: 'API 详情',
})(ApiDetail);
