import React from 'react';
// 引入组件
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import GraphHOCC from '@/components/GraphHOC';

function PvUv(props: any) {
  const pvUvData: any[] = [];
  const { handleFormatTime } = props;
  props.graphData.data.data.forEach((propsDataItem: any) => {
    const time = handleFormatTime(propsDataItem.date);
    pvUvData.push(
      { type: 'pv', time, value: propsDataItem.pv },
      { type: 'uv', time, value: propsDataItem.uv },
    );
  });
  return (
    <Chart height={240} data={pvUvData} padding="auto" forceFit>
      <Legend position="top-center" />
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
  graphTitle: 'PV/UV',
})(PvUv);
