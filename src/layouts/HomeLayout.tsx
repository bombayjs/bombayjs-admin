/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import { Icon, Layout, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';

import { ConnectState } from '@/models/connect';
import logo from '@/assets/logo.svg';
import styles from './HomeLayout.less';
import Avatar from '@/components/GlobalHeader/AvatarDropdown';

const { Header, Footer, Content } = Layout;

export interface BasicLayoutProps {
  dispatch: Dispatch;
}

const footerRender: BasicLayoutProps['footerRender'] = _ => (
  <>
    <div
      style={{
        padding: '0px 24px 24px',
        textAlign: 'center',
      }}
    >
      Copyright <Icon type="copyright" /> 2019 bombayjs出品
    </div>
  </>
);

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  return (
    <Layout>
      <Header className={styles.header}>
        <Row>
          <Col span={8}>
            <img className={styles.logo} src={logo} alt="logo" />
            Bombayjs前端监控平台
          </Col>
          <Col className={styles.avatar} span={8} offset={8}>
            <Avatar />
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer>{footerRender()}</Footer>
    </Layout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
