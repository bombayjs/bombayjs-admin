import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import router from 'umi/router';
import { ClickParam } from 'antd/es/menu';

import Avatar from './AvatarDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import SelectProject from '../SelectProject';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
  projectList: ProjectType[];
  projectToken: string;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout, projectList, projectToken } = props;
  const onChange = ({ key }: ClickParam) => {
    const { location } = window;
    location.href = `${location.origin + location.pathname}?token=${key}`;
  };
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
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
