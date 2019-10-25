import React from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphHOCC from '@/components/GraphHOC';

function ApiSuccess(props: any) {
  const apiSuccessData = props.graphData.data.data.map((propsDataItem: any) => {
    propsDataItem.date = props.handleFormatTime(propsDataItem.date);
    return propsDataItem;
  });
  return (
    <Chart height={240} data={apiSuccessData} padding="auto" forceFit>
      <Legend
        position="top-center"
        allowAllCanceled
        items={[
          {
            value: 'sum_apifail',
            marker: {
              symbol: 'square',
              fill: '#bbb',
              radius: 4,
            },
          },
          {
            value: 'sum_apisucc',
            marker: {
              symbol: 'hyphen',
              stroke: '#1890ff',
              radius: 5,
              lineWidth: 3,
            },
          },
        ]}
      />
      <Axis name="sum_apisucc" />
      <Tooltip />
      <Geom type="interval" position="date*sum_apifail" size={25} color="#bbb" />
      <Geom type="line" position="date*sum_apisucc" size={2} shape="smooth" />
      <Geom type="point" position="date*sum_apisucc" size={4} shape="circle" />
    </Chart>
  );
}

export default GraphHOCC({
  graphTitle: 'Api 请求成功率',
})(ApiSuccess);
