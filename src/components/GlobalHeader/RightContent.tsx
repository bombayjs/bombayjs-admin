import { Icon, Tooltip } from 'antd';
import React, { useState } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import router from 'umi/router';
import { ClickParam } from 'antd/es/menu';
import moment from 'moment';
import { setSessionDateRange, getSessionDateRange } from '@/utils/utils';
import { dateRangeDict } from '@/utils/helper';

import Avatar from './AvatarDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import SelectProject from '../SelectProject';
import SelectDatetime from '../SelectDatetime';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
  projectList: IProjectType[];
  projectToken: string;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const sessionDateRange = getSessionDateRange();
  const initBegin = moment()
    .add(-30, 'minutes')
    .format('YYYY-MM-DD HH:mm');
  const initEnd = moment().format('YYYY-MM-DD HH:mm');
  let initDateRange = `${initBegin} 至 ${initEnd}`;
  if (sessionDateRange) {
    const sessionDateRangeObj: IDateRangeType = JSON.parse(sessionDateRange);
    const { type, begin, end } = sessionDateRangeObj;
    if (type === 'range') {
      initDateRange = `${begin} 至 ${end}`;
    } else {
      initDateRange = dateRangeDict[type];
    }
  }
  const [dateRange, setDateRange] = useState(initDateRange);
  const { theme, layout, projectList, projectToken } = props;
  const onChange = ({ key }: ClickParam) => {
    const { location } = window;
    location.href = `${location.origin + location.pathname}?token=${key}`;
  };

  const setSession = (type: string, begin: string, end: string) => {
    setSessionDateRange({
      type,
      begin,
      end,
    });
  };

  const onSetDateRange = (type: string | [string, string]) => {
    let begin;
    let end = moment().format('YYYY-MM-DD HH:mm');
    switch (type) {
      case '30m':
        begin = moment()
          .add(-30, 'minutes')
          .format('YYYY-MM-DD HH:mm');
        setSession(type, begin, end);
        break;
      case '4h':
        begin = moment()
          .add(-4, 'hours')
          .format('YYYY-MM-DD HH:mm');
        setSession(type, begin, end);
        break;
      case '24h':
        begin = moment()
          .add(-24, 'hours')
          .format('YYYY-MM-DD HH:mm');
        setSession(type, begin, end);
        break;
      case '3D':
        begin = moment()
          .add(-3, 'days')
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case '7D':
        begin = moment()
          .add(-7, 'days')
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case '1M':
        begin = moment()
          .add(-1, 'months')
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case '6M':
        begin = moment()
          .add(-1, 'months')
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case '1Y':
        begin = moment()
          .add(-1, 'years')
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case 'today':
        begin = moment().format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case 'lastday':
        begin = moment()
          .add(-1, 'days')
          .format('YYYY-MM-DD');
        end = moment().format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case 'thisweek':
        begin = moment()
          .weekday(0)
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        setDateRange('本周');
        break;
      case 'thismonth':
        begin = moment()
          .month(moment().month())
          .date(1)
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case 'lastmonth':
        begin = moment()
          .month(moment().month() - 1)
          .date(1)
          .format('YYYY-MM-DD');
        end = moment()
          .month(moment().month())
          .date(1)
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        setDateRange('上月');
        break;
      case 'thisyear':
        begin = moment()
          .year(moment().year())
          .month(0)
          .date(1)
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      case 'lastyear':
        begin = moment()
          .year(moment().year() - 1)
          .month(0)
          .date(1)
          .format('YYYY-MM-DD');
        end = moment()
          .year(moment().year())
          .month(0)
          .date(1)
          .format('YYYY-MM-DD');
        setSession(type, begin, end);
        break;
      default:
        [begin, end] = type;
        // begin = type[0];
        // end = type[1];
        setSession('range', begin, end);
        break;
    }
    if (typeof type === 'string' && dateRangeDict[type]) {
      setDateRange(dateRangeDict[type]);
    } else {
      setDateRange(`${type[0]} 至 ${type[1]}`);
    }
  };

  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <SelectDatetime dateRange={dateRange} setDateRange={onSetDateRange} />
      <SelectProject
        className={styles.action}
        projectList={projectList}
        value={projectToken}
        onChange={onChange}
      />
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings, project }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  projectList: project.projectList,
  projectToken: project.projectToken,
}))(GlobalHeaderRight);
