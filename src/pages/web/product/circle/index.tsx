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
import Link from 'umi/link';
import router from 'umi/router';
import imgWX from '@/assets/img/wx.png';
import imgWeb from '@/assets/img/web.png';
import { addEventVariateDao } from '@/services/eventVariate';

import styles from './style.less';

const ButtonGroup = Button.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

export interface HomeProps extends ConnectProps {
  form: FormComponentProps['form'];
  projectList: ProjectType[];
  projectToken: string;
  loading: boolean;
  dispatch: Dispatch;
}

interface HomeStates {
  projectType: string;
  circleing: boolean;
  projectUrl: string;
  tempProjectUrl: string;
  visible: boolean;
  elmPath: string;
  elmName: string;
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
    const project = props.projectList.find(item => item.token === props.projectToken);
    this.state = {
      projectType: 'web',
      circleing: false,
      projectUrl: project ? project.url : '',
      tempProjectUrl: project ? project.url : '', // 保存中间projectUrl
      visible: false,
      elmPath: '', // 元素路径
      elmName: '', // 元素名称
    };
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/fetchProjectList',
    });
    window.addEventListener('message', this.handleCircle, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleCircle, false);
  }

  handleCircle = (event: MessageEvent) => {
    console.log(event);
    if (!event.data || !event.data.t) return;
    if (event.data.t === 'setElmPath') {
      this.setState({
        visible: true,
        elmPath: event.data.path,
      });
    } else if (event.data.t === 'setPage') {
      this.setState({
        tempProjectUrl: event.data.page,
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

  onClose = () => {
    this.setState({
      visible: false,
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const variate: EventVariate = {
          project_token: this.props.projectToken, // 项目id
          name: values.name, // 事件名称
          marker: values.path, // 标识符 圈选就是路径
          type: 'circle', // 类型
        };
        const result = await addEventVariateDao(variate);
        if (result.code === 200) {
          this.setState({
            visible: false,
            elmName: '',
          });
        } else {
          message.error(result.msg);
        }
      }
    });
  };

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const {
      projectType,
      projectUrl,
      tempProjectUrl,
      circleing,
      visible,
      elmPath,
      elmName,
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
          <Col span={2}>
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
        </Row>
        <iframe
          title="iframe"
          ref={this.iframeRef}
          style={iframeStyle}
          className={styles.iframe}
          src={projectUrl}
        ></iframe>
        <Drawer
          title="定义元素"
          placement="right"
          closable
          onClose={this.onClose}
          visible={visible}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="元素名称">
              {getFieldDecorator('name', {
                initialValue: elmName,
                rules: [{ required: true, message: '请输入元素名称!', type: 'string' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="元素路径">
              {getFieldDecorator('path', {
                initialValue: elmPath,
              })(<Input readOnly />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(Home);
