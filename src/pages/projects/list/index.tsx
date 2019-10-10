import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Dispatch } from 'redux';
import { connect } from 'dva';
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
import { addProjectDao } from '@/services/project';

import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

export interface HomeProps extends ConnectProps {
  form: FormComponentProps['form'];
  projectList: IProjectType[];
  loading: boolean;
  dispatch: Dispatch;
}

interface HomeStates {
  project: IProjectType;
  visible: boolean;
}

@connect(({ project, loading }: ConnectState) => ({
  projectList: project.projectList,
  loading: loading.effects['project/fetchProjectList'],
}))
class Home extends React.Component<HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      visible: false,
      project: {
        project_name: '',
        type: 'web',
      },
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/fetchProjectList',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    const { project } = this.state;
    const result = await addProjectDao(project);
    if (result && result.code === 200) {
      this.setState({
        visible: false,
      });
      router.push(`/web/setting?token=${result.data.token}`);
    } else {
      message.error(result.msg);
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  selectType = (e: any) => {
    const { project } = this.state;
    this.setState({
      project: {
        ...project,
        type: e.target.value,
      },
    });
  };

  setProjectName = (e: any) => {
    const { project } = this.state;
    this.setState({
      project: {
        ...project,
        project_name: e.target.value,
      },
    });
  };

  setProjectUrl = (e: any) => {
    const { project } = this.state;
    this.setState({
      project: {
        ...project,
        url: e.target.value,
      },
    });
  };

  setProjectAppId = (e: any) => {
    const { project } = this.state;
    this.setState({
      project: {
        ...project,
        app_id: e.target.value,
      },
    });
  };

  render() {
    const { project } = this.state;
    const { projectList, loading } = this.props;
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

    const ListContent = (props: { data: IProjectType }) => {
      const { project_name: projectName, type, token, is_use: isUse } = props.data;
      return (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>ProjectName</span>
            <p>{projectName}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>type</span>
            <p>{type}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>token</span>
            <p>{token}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>is_use</span>
            <p>{isUse}</p>
          </div>
        </div>
      );
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: projectList.length,
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
            dataSource={projectList}
            renderItem={item => (
              <List.Item
                actions={[
                  <Link to={`/web/setting?token=${item.token}`}>编辑</Link>,
                  // <MoreBtn current={item} />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    item.type === 'wx' ? (
                      <img src={imgWX} alt="微信" />
                    ) : (
                      <img src={imgWeb} alt="web" />
                    )
                  }
                  title={<Link to={`/web/setting?token=${item.token}`}>{item.project_name}</Link>}
                  description="xxxx"
                />
                <ListContent data={item} />
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
          <Radio.Group onChange={this.selectType} defaultValue={project.type}>
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
              <Input value={project.project_name} onChange={this.setProjectName} />
            </Col>
          </Row>
          {project.type === 'web' ? (
            <Row className={styles.row}>
              <Col span={4}>应用url：</Col>
              <Col span={18}>
                <Input value={project.url} onChange={this.setProjectUrl} />
              </Col>
            </Row>
          ) : (
            <Row className={styles.row}>
              <Col span={4}>应用appId：</Col>
              <Col span={18}>
                <Input value={project.app_id} onChange={this.setProjectAppId} />
              </Col>
            </Row>
          )}
        </Modal>
      </div>
    );
  }
}

export default Home;
