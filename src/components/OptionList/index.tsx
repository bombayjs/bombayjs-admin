import React, { Component } from 'react';
// 引入组件
import { Form, Icon, Input, Button, Tabs } from 'antd';
// 引入样式
import styles from './style.less';

const { TabPane } = Tabs;
interface OptionListProps {
  listTitle?: string;
  isNeedSearch?: boolean; // 是否展示查询表单UI
  isNeedTab?: boolean; // 是否需要Tab展示
  listData: {
    // 选项列表数据
    isActive: boolean;
    name: string;
    resultNum: string;
  }[];
  listTabConfig?: {
    name: string;
    title: string;
  }[];
  handleClickListItem(listDataItem: any): void; // 点击列表选项回调处理
  handleClickTabItem?(listTabItem: any): void; // 点击Tab选项回调处理
}

function OptionList(props: OptionListProps) {
  const {
    listTitle,
    isNeedSearch,
    isNeedTab,
    listData,
    listTabConfig,
    handleClickListItem,
    handleClickTabItem,
  } = props;
  const listContent = (
    <>
      {/* 标题 */}
      {listTitle && <p>{listTitle}</p>}
      {/* 查询表单UI */}
      {isNeedSearch && (
        <Form layout="inline">
          <Input className={styles.listSeachInput} placeholder="请输入要查询页面的关键字" />
          <Button className={styles.listSearchButton}>
            <Icon type="search"></Icon>
          </Button>
        </Form>
      )}
      {/* 选项列表UI */}
      <ul className={styles.listContent}>
        {listData.map(listDataItem => (
          <li
            key={listDataItem.name}
            className={listDataItem.isActive ? styles.active : undefined}
            onClick={() => {
              handleClickListItem(listDataItem);
            }}
          >
            <span>{listDataItem.name}</span>
            <span>{listDataItem.resultNum}</span>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <div className={styles.optionListContainer}>
      {!isNeedTab ? (
        listContent
      ) : (
        <Tabs tabBarStyle={{ width: 351 }} onChange={handleClickTabItem}>
          {listTabConfig &&
            listTabConfig.map(tabItem => (
              <TabPane
                tab={tabItem.title}
                key={`${tabItem.title}`}
                className={styles.commonTabContent}
              >
                {listContent}
              </TabPane>
            ))}
        </Tabs>
      )}
    </div>
  );
}

export default OptionList;
