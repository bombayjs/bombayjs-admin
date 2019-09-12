/* eslint react/no-multi-comp:0, no-console:0 */

import React from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = window.location.search.indexOf('cn') !== -1;

if (cn) {
  moment.locale('zh-cn');
} else {
  moment.locale('en-gb');
}

const now = moment();
if (cn) {
  now.utcOffset(8);
} else {
  now.utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
);

function disabledDate(current: any) {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.isAfter(date); // can not select days before today
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';

export interface CalendarPropsType {
  onChange?: (value: [moment.Moment, moment.Moment]) => void;
  onSelect: (value: [moment.Moment, moment.Moment]) => void;
}

const Calendar: React.FC<CalendarPropsType> = props => {
  const { onChange, onSelect } = props;
  return (
    <RangeCalendar
      showToday={false}
      showWeekNumber
      dateInputPlaceholder={['start', 'end']}
      locale={cn ? zhCN : enUS}
      showOk={false}
      showClear={false}
      format={formatStr}
      onChange={onChange}
      onSelect={onSelect}
      disabledDate={disabledDate}
      timePicker={timePickerElement}
    />
  );
};

export default Calendar;
