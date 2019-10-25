import React from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphHOCC from '@/components/GraphHOC';

function AccessSpeed(props: any) {
  const accessSpeedData: any[] = [];
  const { handleFormatTime } = props;
  props.graphData.data.data.forEach((propsDataItem: any) => {
    const time = handleFormatTime(propsDataItem.date);
    accessSpeedData.push(
      { type: 'DOM Ready', time, value: propsDataItem.avg_dom },
      { type: '首次渲染', time, value: propsDataItem.avg_ready },
      { type: '页面完全加载', time, value: propsDataItem.avg_load },
      { type: 'cfpt', time, value: propsDataItem.avg_fpt },
      { type: 'ctti', time, value: propsDataItem.avg_tti },
    );
  });
  return (
    <Chart height={240} data={accessSpeedData} padding="auto" forceFit>
      <Legend position="right-center" />
      <Axis name="time" />
      <Axis name="value" />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom type="line" position="time*value" size={2} color="type" shape="smooth" />
      <Geom
        type="point"
        position="time*value"
        size={4}
        shape="circle"
        color="type"
        style={{
          stroke: '#fff',
          lineWidth: 1,
        }}
      />
    </Chart>
  );
}

export default GraphHOCC({
  graphTitle: '访问速度',
})(AccessSpeed);
