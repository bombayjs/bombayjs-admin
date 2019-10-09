import { Icon, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import styles from './index.less';

interface SelectProjectProps {
  className?: string;
  projectList: IProjectType[];
  value: string;
  onChange: ({ key }: ClickParam) => void;
}
const SelectProject: React.FC<SelectProjectProps> = props => {
  const { projectList, value, onChange } = props;

  const project = projectList.find(item => item.token === value);
  const projectMenu = (
    <Menu className={styles.menu} selectedKeys={[value]} onClick={onChange}>
      {projectList.map(item => (
        <Menu.Item key={item.token}>{item.project_name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={projectMenu} placement="bottomRight">
      <a className="ant-dropdown-link">
        {project ? project.project_name : '请选择'} <Icon type="down" />
      </a>
    </Dropdown>
  );
};

export default SelectProject;
