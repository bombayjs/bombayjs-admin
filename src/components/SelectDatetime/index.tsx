import { Button, Icon, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import styles from './index.less';

interface SelectProjectProps {
  begin: string;
  end: string;
  className?: string;
  onChange: ({ key }: ClickParam) => void;
}
const SelectProject: React.FC<SelectProjectProps> = props => {
  const { begin, end, onChange } = props;

  const menu = (
    <Menu onClick={onChange}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button style={{ marginRight: '20px' }}>
        {begin} - {end} <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default SelectProject;
