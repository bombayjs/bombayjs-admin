import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Icon,
  Input,
  Button,
  message,
  Skeleton,
  Switch,
  Card,
  Avatar,
  Radio,
  List,
  Modal,
  Row,
  Col,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import router from 'umi/router';
import imgWX from '@/assets/img/wx.png';
import imgWeb from '@/assets/img/web.png';

import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface RegisterProps {
  form: FormComponentProps['form'];
}

class Home extends React.Component<RegisterProps> {
  state = {
    loading: true,
    visible: false,
    projectName: '',
    projectType: 'web',
  };

  onChange = (checked: any) => {
    this.setState({ loading: !checked });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  selectType = (e: any) => {
    this.setState({
      projectType: e.target.value,
    });
  };

  setProjectName = (e: any) => {
    this.setState({
      projectName: e.target.value,
    });
  };

  render() {
    const { loading, projectType, projectName } = this.state;
    const list = [];
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">已停用</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="项目列表"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={this.showModal}
          >
            添加
          </Button>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                  // onClick={e => {
                  //   e.preventDefault();
                  //   this.showEditModal(item);
                  // }}
                  >
                    编辑
                  </a>,
                  // <MoreBtn current={item} />,
                ]}
              >
                {/* <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} /> */}
              </List.Item>
            )}
          />
        </Card>
        <Modal
          title="新建应用站点"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <div className={styles['modal-title']}>站点类型：</div>
          <Radio.Group onChange={this.selectType} defaultValue={projectType}>
            <Radio value="web">
              <span className={styles['project-type']}>
                <img src={imgWeb} alt="web" />
                <br />
                web
              </span>
            </Radio>
            <Radio value="wx">
              <span className={styles['project-type']}>
                <img src={imgWX} alt="微信" />
                <br />
                微信
              </span>
            </Radio>
          </Radio.Group>
          <Row className={styles.row}>
            <Col span={4}>应用名称：</Col>
            <Col span={18}>
              <Input value={projectName} onChange={this.setProjectName} />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Home;
