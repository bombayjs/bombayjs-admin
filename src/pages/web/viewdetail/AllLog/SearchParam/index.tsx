import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import styles from './index.less';

interface SearchParamPropsType {
  form: any;
}

interface SearchParamPropsStateType {
  expand: boolean;
  allParams: Array<paramsItemType>;
}

interface paramsItemType {
  itemType: string;
  localName: string;
  itemName: string;
  placeholder?: string;
  selectData?: Array<any>;
}

class SearchParam extends PureComponent<SearchParamPropsType, SearchParamPropsStateType> {
  constructor(props: SearchParamPropsType) {
    super(props);
    this.state = {
      expand: false,
      allParams: [
        {
          localName: formatMessage({ id: 'viewdetail.alllog.pageurl' }),
          itemName: 'pageUrl',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.uid' }),
          itemName: 'uid',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.logType' }),
          itemName: 'logType',
          itemType: 'select',
          placeholder: formatMessage({ id: 'viewdetail.alllog.logType_placeholder' }),
          selectData: ['api', 'pv', 'health', 'perf', 'avg', 'sum', 'res', 'error', 'custom'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.device' }),
          itemName: 'device',
          itemType: 'select',
          placeholder: formatMessage({ id: 'viewdetail.alllog.select_enter_condition' }),
          selectData: ['mac', 'iphone', 'huawei', 'vivo', 'oppo', 'ipad', 'samsung', 'xiaomi'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.jsfile_url' }),
          itemName: 'jsFileUrl',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.js_errmsg' }),
          itemName: 'jsErrMsg',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.page_full_loadtime' }),
          itemName: 'pageFullLoadtime',
          itemType: 'range',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.geography' }),
          itemName: 'geography',
          itemType: 'cascader',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.api_requesturl' }),
          itemName: 'apiRequestUrl',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.api_request_time_exceeded' }),
          itemName: 'apiReqtime',
          itemType: 'select',
          placeholder: '',
          selectData: ['1000', '2000', '3000', '5000', '10000'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.apimsg' }),
          itemName: 'apiMsg',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.api_report_error' }),
          itemName: 'apiReportError',
          itemType: 'select',
          placeholder: '',
          selectData: ['Yes', 'No'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.traceid' }),
          itemName: 'traceId',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.code' }),
          itemName: 'code',
          itemType: 'select',
          placeholder: '',
          selectData: ['200', '404', '504', 'FAILED'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.browser' }),
          itemName: 'browser',
          itemType: 'select',
          placeholder: '',
          selectData: ['chrome', 'firefox', 'safari', 'ie', 'sougou', 'uc'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.oper_sys' }),
          itemName: 'operatSys',
          itemType: 'select',
          placeholder: '',
          selectData: ['windows', 'android', 'macos', 'ios', 'linux'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.resolution' }),
          itemName: 'resolution',
          itemType: 'select',
          placeholder: '',
          selectData: [
            '1920x1080',
            '1440x900',
            '1600x900',
            '360x640',
            '414x736',
            '375x667',
            '375x812',
          ],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.client' }),
          itemName: 'client',
          itemType: 'select',
          placeholder: '',
          selectData: ['微信', '支付宝', '淘宝'],
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.referrer' }),
          itemName: 'referrer',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.ip' }),
          itemName: 'ip',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.sid' }),
          itemName: 'sid',
          itemType: 'input',
          placeholder: '',
        },
        {
          localName: formatMessage({ id: 'viewdetail.alllog.tag' }),
          itemName: 'tag',
          itemType: 'input',
          placeholder: '',
        },
      ],
    };
  }

  selectOnChange = (value: any, type: any) => {
    console.log('value:', value);
    console.log('type', type);
  };

  renderFormItem = (item: paramsItemType, index: number) => {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    switch (item.itemType) {
      case 'range':
        return (
          <Col key={index} span={6} className={styles['params-col']}>
            <Form.Item className={styles['form-item']} label={item.localName}>
              <div className={styles['range-row-container']}>
                <div>
                  <Input placeholder={item.placeholder} />
                </div>
                <div className={styles['range-gap']}>—</div>
                <div>
                  <Input placeholder={item.placeholder} />
                </div>
              </div>
            </Form.Item>
          </Col>
        );
      case 'cascader':
        return (
          <Col key={index} span={6} className={styles['params-col']}>
            <Form.Item className={styles['form-item']} label={item.localName}>
              cascader
            </Form.Item>
          </Col>
        );
      case 'select':
        return (
          <Col key={index} span={6} className={styles['params-col']}>
            <Form.Item className={styles['form-item']} label={item.localName}>
              <Select onChange={this.selectOnChange}>
                {item.selectData &&
                  item.selectData.map(selectValue => (
                    <Option value={selectValue}>{selectValue}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        );
      default:
        return (
          <Col key={index} span={6} className={styles['params-col']}>
            <Form.Item className={styles['form-item']} label={item.localName}>
              {getFieldDecorator(item.itemName, {})(<Input placeholder={item.placeholder} />)}
            </Form.Item>
          </Col>
        );
    }
  };

  getAllParams = () => {
    const { allParams, expand } = this.state;
    return allParams.map((item: paramsItemType, index: number) => {
      if (expand) {
        return this.renderFormItem(item, index);
      }
      if (index < 4) {
        return this.renderFormItem(item, index);
      }
      return '';
    });
  };

  search = () => {
    console.log('search');
  };

  clear = () => {
    console.log('clear');
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <Form>
        <Row gutter={24}>{this.getAllParams()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '8px' }}>
            <Button type="primary" onClick={this.search}>
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.clear}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchParam);
