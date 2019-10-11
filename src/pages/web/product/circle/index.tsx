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
  Dropdown,
  Menu,
  Row,
  Col,
  Drawer,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { setEventVariateDao, getEventVariateDao, } from '@/services/eventVariate';
import { setPageVariateDao, getPageVariateDao, } from '@/services/pageVariate';
import EventVariateForm from '@/components/EventVariateForm';
import PageVariateForm from '@/components/PageVariateForm';

import styles from './style.less';

const ButtonGroup = Button.Group;

export interface HomeProps extends ConnectProps {
  form: FormComponentProps['form'];
  projectList: IProjectType[];
  projectToken: string;
  loading: boolean;
  dispatch: Dispatch;
}

interface HomeStates {
  projectType: string;
  circleing: boolean;
  projectUrl: string;
  tempProjectUrl: string;
  page: {
    _id: string;
    name: string;
    path: string;
  };
  visiblePage: boolean;
  visible: boolean;
  record: {
    _id: string;
    name: string;
    marker: string;
  }; // 正在编辑的事件
}

@connect(({ project, loading }: ConnectState) => ({
  projectList: project.projectList,
  projectToken: project.projectToken,
  loading: loading.effects['project/fetchProjectList'],
}))
class Home extends React.Component<HomeProps, HomeStates> {
  iframeRef: any;

  constructor(props: HomeProps) {
    super(props);
    console.log(props.projectToken)
    this.state = {
      projectType: 'web',
      circleing: false,
      projectUrl: '',
      tempProjectUrl: '', // 保存中间projectUrl
      page: {
        _id: '',
        name: '',
        path: '',
      },
      visiblePage: false,
      visible: false,
      record: {
        _id: '',
        name: '',
        marker: '',
      },
    };
    this.iframeRef = React.createRef();
  }

  async componentDidMount() {
    await this.props.dispatch({
      type: 'project/fetchProjectList',
    });
    const project = this.props.projectList.find(item => item.token === this.props.projectToken);
    this.setState({
      projectUrl: project ? project.url : '',
      tempProjectUrl: project ? project.url : '', // 保存中间projectUrl
    })
    window.addEventListener('message', this.handleMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false);
  }

  handleMessage = async (event: MessageEvent) => {
    console.log(event);
    if (!event.data || !event.data.t) return;
    if (event.data.t === 'setElmPath') {
      const result = await getEventVariateDao({
        project_token: this.props.projectToken,
        marker: event.data.path,
      })
      if (result && result.code === 200) {
        const { _id, name, marker, } = result.data
        this.setState({
          visible: true,
          record: {
            _id,
            name,
            marker,
          }
        });
      } else {
        this.setState({
          visible: true,
          record: {
            _id: '',
            name: '',
            marker: event.data.path,
          }
        });
      }

    } else if (event.data.t === 'setPage') {
      this.setState({
        page: {
          _id: '',
          name: '',
          path: event.data.page,
        },
        tempProjectUrl: event.data.href,
      });

    }
  };

  handleMenuClick = e => {
    this.setState({
      projectType: e.key,
    });
  };

  handleCircleChange = e => {
    const circleing = e.target.value;

    const iframe = this.iframeRef.current;
    iframe.contentWindow.postMessage(
      {
        t: 'setCircle',
        v: circleing,
      },
      '*',
    );
    this.setState({
      circleing: e.target.value,
    });
  };

  onInput = e => {
    this.setState({
      tempProjectUrl: e.target.value,
    });
  };

  onSearch = () => {
    const { tempProjectUrl } = this.state;
    this.setState({
      projectUrl: tempProjectUrl,
    });
  };

  goBack = () => {
    const { projectUrl, tempProjectUrl } = this.state;
    // projectUrl和tempProjectUrl想等时不再回退
    if (projectUrl === tempProjectUrl) return;
    const iframe = this.iframeRef.current;
    iframe.contentWindow.postMessage(
      {
        t: 'back',
      },
      '*',
    );
  };

  goForward = () => {
    const iframe = this.iframeRef.current;
    iframe.contentWindow.postMessage(
      {
        t: 'forward',
      },
      '*',
    );
  };

  handleModalVisible = (visible: boolean) => {
    this.setState({
      visible,
    });
  };

  handleVisiblePage = async (visiblePage: boolean) => {
    const path = this.state.page.path
    if (visiblePage) {
      const result = await getPageVariateDao({
        project_token: this.props.projectToken,
        path,
      })
      if (result && result.code === 200) {
        const { _id, name, path, } = result.data
        this.setState({
        visiblePage: true,
        page: {
            _id,
            name,
            path,
          },
        });
      } else {
        this.setState({
        visiblePage: true,
        page: {
            _id: '',
            name: '',
            path,
          },
        });
      }
    } else {
      this.setState({
        visiblePage: false,
      });
    }
  };

  handleSubmit = async values => {
    const variate: IEventVariate = {
      project_token: this.props.projectToken, // 项目id
      name: values.name, // 事件名称
      marker: values.marker, // 标识符 圈选就是路径
      type: 'circle', // 类型
    };
    const result = await setEventVariateDao(variate);
    if (result && result.code === 200) {
      this.setState({
        visible: false,
        record: {
          _id: '',
          name: '',
          marker: '',
        }
      });
    } else {
      message.error(result.msg);
    }
  };

  handleSubmitPage = async values => {
    const variate: IPageVariate = {
      project_token: this.props.projectToken, // 项目id
      name: values.name, // 事件名称
      path: values.path, // 标识符 圈选就是路径
    };
    const result = await setPageVariateDao(variate);
    if (result && result.code === 200) {
      this.setState({
        visiblePage: false,
        page: {
          _id: '',
          name: '',
          path: values.path,
        }
      });
    } else {
      message.error(result.msg);
    }
  };

  render() {
    const {
      projectType,
      projectUrl,
      tempProjectUrl,
      circleing,
      visible,
      record,
      page,
      visiblePage,
    } = this.state;

    const iframeStyle =
      projectType === 'web'
        ? { width: '100%', height: '100%', minHeight: '800px' }
        : { width: '375px', height: '667px' };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="web">电脑</Menu.Item>
        <Menu.Item key="mobile">手机</Menu.Item>
      </Menu>
    );

    const btns = (
      <ButtonGroup>
        <Button onClick={this.goBack}>
          <Icon type="left" />
        </Button>
        <Button onClick={this.goForward}>
          <Icon type="right" />
        </Button>
      </ButtonGroup>
    );

    const addOnAfter = <Button onClick={this.onSearch}>跳转</Button>;

    return (
      <div>
        <Row gutter={2} className={styles.header}>
          <Col span={3}>
            <Radio.Group value={circleing} onChange={this.handleCircleChange}>
              <Radio.Button value={false}>浏览</Radio.Button>
              <Radio.Button value>圈选</Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={2}>
            <Dropdown overlay={menu}>
              <Button>
                {projectType === 'web' ? '电脑' : '手机'} <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span={10}>
            <div className={styles['search-input']}>
              {btns}
              <Input
                addonAfter={addOnAfter}
                placeholder="请输入网址"
                value={tempProjectUrl}
                onChange={this.onInput}
                onPressEnter={this.onInput}
                allowClear
              />
            </div>
          </Col>
          <Col span={2}>
            <Button onClick={() => this.handleVisiblePage(true)}>定义页面</Button>
          </Col>
        </Row>
        <iframe
          title="iframe"
          ref={this.iframeRef}
          style={iframeStyle}
          className={styles.iframe}
          src={projectUrl}
        ></iframe>
        <EventVariateForm
          name={record.name}
          marker={record.marker}
          visible={visible}
          onClose={() => this.handleModalVisible(false)}
          handleSubmit={this.handleSubmit}
        />
        <PageVariateForm
          name={page.name}
          path={page.path}
          visible={visiblePage}
          onClose={() => this.handleVisiblePage(false)}
          handleSubmit={this.handleSubmitPage}
        />
      </div>
    );
  }
}

export default Form.create()(Home);
