import React from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphHOCC from '@/components/GraphHOC';

function JsError(props: any) {
  const jsErrorData = props.graphData.data.data.map((propsDataItem: any) => {
    propsDataItem.date = props.handleFormatTime(propsDataItem.date);
    return propsDataItem;
  });
  return (
    <Chart height={240} data={jsErrorData} padding="auto" forceFit>
      <Legend
        position="top-center"
        allowAllCanceled
        items={[
          {
            value: 'count',
            marker: {
              symbol: 'square',
              fill: '#bbb',
              radius: 4,
            },
          },
          {
            value: 'uv',
            marker: {
              symbol: 'hyphen',
              stroke: '#1890ff',
              radius: 5,
              lineWidth: 3,
            },
          },
        ]}
      />
      <Axis name="uv" />
      <Tooltip />
      <Geom type="interval" position="date*count" size={25} color="#bbb" />
      <Geom type="line" position="date*uv" size={2} shape="smooth" />
      <Geom type="point" position="date*uv" size={2} shape="circle" />
    </Chart>
  );
}

export default GraphHOCC({
  graphTitle: 'JS 错误率',
})(JsError);
