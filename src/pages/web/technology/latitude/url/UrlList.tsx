import React, { Component } from 'react';
// 引入组件
import { Form, Icon, Input, Button } from 'antd';
// 引入样式
import styles from './style.less';

interface UrlListData {
  page: string;
  pv?: string;
  uv?: string;
  active?: boolean;
}
interface UrlListProps {
  urlListData: UrlListData[];
  urlListTotalNumber: number;
  handleClickUrlListData(str: string): void;
}

class UrlList extends Component<UrlListProps, {}> {
  handleToPercent = (num: number) => `${Number(num * 100).toFixed(2)}%`; // 转换百分数

  render() {
    const { urlListData, urlListTotalNumber, handleClickUrlListData } = this.props;
    const urlListItemPart = urlListData.map((urlListItem: UrlListData) => (
      <li
        key={urlListItem.page}
        className={urlListItem.active ? styles.active : undefined}
        onClick={() => {
          handleClickUrlListData(urlListItem.page);
        }}
      >
        <span className={styles.urlListPageText}>{urlListItem.page}</span>
        <span>{`${urlListItem.pv} (${this.handleToPercent(
          Number(urlListItem.pv) / urlListTotalNumber,
        )})`}</span>
      </li>
    ));
    return (
      <div className={styles.urlListContainer}>
        {/* 查询页面表单 */}
        <Form layout="inline">
          <Input className={styles.urlListSeachInput} placeholder="请输入要查询页面的关键字" />
          <Button className={styles.urlListSearchButton}>
            <Icon type="search"></Icon>
          </Button>
        </Form>
        {/* 页面列表 */}
        <ul className={styles.urlListContent}>{urlListItemPart}</ul>
      </div>
    );
  }
}

export default UrlList;
