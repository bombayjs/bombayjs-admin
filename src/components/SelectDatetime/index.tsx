import { Button, Icon, Menu, Dropdown, Card, Row, Col, DatePicker } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React, { useState } from 'react';
import styles from './index.less';
// import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
// import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import Calendar from '../Calendar/index';

interface SelectProjectProps {
  dateRange: string;
  className?: string;
  setDateRange: (type: string | [string, string]) => void;
}
const SelectProject: React.FC<SelectProjectProps> = props => {
  const [dateVisible, setDateVisible] = useState(false);
  const [begin, setBegin] = useState('');
  const [end, setEnd] = useState('');
  const { dateRange, setDateRange } = props;

  const onOk = () => {
    setDateRange([begin, end]);
    setDateVisible(false);
  };

  const onShowdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateVisible(!dateVisible);
  };

  const onSetDateRange = (e: React.MouseEvent, type: string) => {
    setDateRange(type);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  function onStandaloneSelect(value: [moment.Moment, moment.Moment]) {
    console.log('onSelect');
    console.log(value[0].format('YYYY-MM-DD HH:mm:ss'), value[1].format('YYYY-MM-DD HH:mm:ss'));
    setBegin(value[0].format('YYYY-MM-DD HH:mm:ss'));
    setEnd(value[1].format('YYYY-MM-DD HH:mm:ss'));
  }

  const menu = (
    <Card bordered={false} style={{ width: 610, padding: '12px 16px' }}>
      <Row className={styles.row} gutter={8}>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '30m');
            }}
          >
            30分钟
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '4h');
            }}
          >
            4时
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '24h');
            }}
          >
            24时
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '3D');
            }}
          >
            3天
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '7D');
            }}
          >
            7天
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '1M');
            }}
          >
            1个月
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '6M');
            }}
          >
            6个月
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, '1Y');
            }}
          >
            1年
          </Button>
        </Col>
      </Row>
      <Row className={styles.row} gutter={8}>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'today');
            }}
          >
            今天
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'lastday');
            }}
          >
            昨天
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'thisweek');
            }}
          >
            本周
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'thismonth');
            }}
          >
            本月
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'lastmonth');
            }}
          >
            上月
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'thisyear');
            }}
          >
            今年
          </Button>
        </Col>
        <Col span={3}>
          <Button
            block
            className={styles.btn}
            onClick={e => {
              onSetDateRange(e, 'lastyear');
            }}
          >
            去年
          </Button>
        </Col>
        <Col span={3}>
          <Button block className={styles.btn} onClick={onShowdate}>
            自定义
          </Button>
        </Col>
      </Row>
      {dateVisible && (
        <Row
          className={styles.row}
          onClick={e => {
            stopPropagation(e);
          }}
        >
          <Calendar onSelect={onStandaloneSelect} />
        </Row>
      )}
      {dateVisible && (
        <Row className={styles.row}>
          <Col>
            <Button
              onClick={e => {
                onOk();
              }}
            >
              确认
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Button style={{ marginRight: '20px' }}>
        {dateRange} <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default SelectProject;
